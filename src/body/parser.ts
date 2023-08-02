import { DouhRequest, DouhResponse } from '../http';
import { NextFunction } from '../application';

const methodsContainedBody = new Set(['POST', 'PUT', 'PATCH']);

export async function bodyParser(req: DouhRequest, _: DouhResponse, next: NextFunction) {
  if (req.method && methodsContainedBody.has(req.method)) {
    const contentType = req.headers['content-type'];

    if (contentType === 'application/json') {
      // call next after parsing body
      const body = await readStringifiedRequestBody(req);
      req.body = body;
      next();
    }
  } else {
    next();
  }
}

function readStringifiedRequestBody(req: DouhRequest) {
  return new Promise((resolve, reject) => {
    const buffers: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      buffers.push(chunk);
    });

    req.on('end', () => {
      const payload = Buffer.concat(buffers).toString();
      const body = JSON.parse(payload);
      resolve(body);
    });

    req.on('error', (error) => {
      reject(error);
    });
  }) as Promise<Record<string, any>>;
}
