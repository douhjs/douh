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
  } else {
    next();
  }
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
