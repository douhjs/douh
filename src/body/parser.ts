import * as http from 'http';
import { NextFunction } from '../application';

declare module 'http' {
  interface IncomingMessage {
    // NOTE: supply parse JSON body at Now
    body?: {
      [key: string]: any;
    };
    params: {
      [key: string]: any;
    };
  }
  interface ServerResponse {
    body?: any;
  }
}

const methodContainedBody = new Set(['POST', 'PUT', 'PATCH']);

export function bodyParser(req: http.IncomingMessage, res: http.ServerResponse, next: NextFunction) {
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
