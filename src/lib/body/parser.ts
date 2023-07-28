import * as http from 'http';
import { NextFunction } from '../application';

export function bodyParser(req: http.IncomingMessage, res: http.ServerResponse, next: NextFunction) {
  const buffers: Buffer[] = [];
  req.on('data', (chunk: Buffer) => {
    buffers.push(chunk);
    const payload = Buffer.concat(buffers).toString();
    const body = JSON.parse(payload);
    // @ts-expect-error
    req.body = body;
    next();
  });
}
