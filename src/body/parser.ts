import { DouhRequest, DouhResponse } from '../http';
import { NextFunction } from '../application';

const methodContainedBody = new Set(['POST', 'PUT', 'PATCH']);

export function bodyParser(req: DouhRequest, res: DouhResponse, next: NextFunction) {
  if (req.method && methodContainedBody.has(req.method)) {
    const buffers: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      buffers.push(chunk);
      const payload = Buffer.concat(buffers).toString();
      const body = JSON.parse(payload);
      req.body = body;
      next();
    });
  } else {
    next();
  }
}
