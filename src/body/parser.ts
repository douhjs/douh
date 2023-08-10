import * as http from 'http';
import { NextFunction } from '../application';

const methodsContainedBody = new Set(['POST', 'PUT', 'PATCH']);

export async function bodyParser(req: http.IncomingMessage, _: http.ServerResponse, next: NextFunction) {
  if (req.method && methodsContainedBody.has(req.method)) {
    const contentType = req.headers['content-type'];

    if (contentType === 'application/json') {
      const stringifiedBody = await readStringifiedRequestBody(req);
      req.body = stringifiedBody ? JSON.parse(stringifiedBody) : {};
      next();
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      const stringifiedBody = await readStringifiedRequestBody(req);
      const params = new URLSearchParams(stringifiedBody);
      req.body = {};
      for (const [key, value] of params) {
        req.body[key] = value;
      }
      next();
    }
    if (contentType && contentType.startsWith('multipart/form-data')) {
      const boundary = extractBoundary(contentType);
      const { formDataBody, formDataFiles } = await parseMultipartFormData(req, boundary);
      req.body = formDataBody;
      req.files = formDataFiles;
      next();
    }
  } else {
    next();
  }
}

function extractBoundary(contentType: string): string {
  const boundaryPattern = /boundary=(?:"([^"]+)"|([^;]+))/i;
  const match = contentType.match(boundaryPattern);
  return match ? match[1] || match[2] : '';
}

/**
 * resolve stringified request body
 */
function readStringifiedRequestBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    const buffers: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      buffers.push(chunk);
    });

    req.on('end', () => {
      const payload = Buffer.concat(buffers).toString();
      resolve(payload);
    });

    req.on('error', (error) => {
      reject(error);
    });
  }) as Promise<string>;
}

/**
 * resolve multipart formData
 */
function parseMultipartFormData(
  req: http.IncomingMessage,
  boundary: string,
): Promise<{ formDataBody: Record<string, string>; formDataFiles: RequestFiles }> {
  return new Promise((resolve, reject) => {
    const formDataBody: Record<string, string> = {};
    const formDataFiles: RequestFiles = {} as RequestFiles;
    const buffers: Buffer[] = [];
    let currentFieldName = '';

    req.on('data', (chunk: Buffer) => {
      buffers.push(chunk);
    });

    req.on('end', () => {
      const payload = Buffer.concat(buffers);
      const parts = payload.toString().split(`--${boundary}`);

      for (const part of parts) {
        const [headers, body] = part.split('\r\n\r\n');
        const contentDisposition = headers.match(/Content-Disposition:.*name="([^"]+)"/i);

        if (contentDisposition) {
          const [_, name] = contentDisposition[0].match(/name="([^"]+)"/)!;
          const fileInfo = contentDisposition[0].match(/filename="([^"]+)"/);
          if (fileInfo) {
            if (formDataFiles[name]) {
              formDataFiles[name].push({
                fieldName: name,
                fileName: fileInfo[1],
                fileContent: body,
              });
            } else {
              formDataFiles[name] = [
                {
                  fieldName: name,
                  fileName: fileInfo[1],
                  fileContent: body,
                },
              ];
            }
          } else {
            currentFieldName = name;
            formDataBody[currentFieldName] = body.trim();
          }
        }
      }

      resolve({ formDataBody, formDataFiles });
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}
