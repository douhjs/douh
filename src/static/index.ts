import * as fs from 'fs';
import * as asyncFs from 'fs/promises';
import * as path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { NextFunction } from '../application';

function getContentType(filePath: string): string {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

export function serveStatic(baseRoute: string) {
  return async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    let filePath = path.join(__dirname, '..', baseRoute, req.url!);
    const exist = fs.existsSync(filePath);
    if (!exist) {
      return next();
    }
    let stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stat = await asyncFs.stat(filePath);
    }

    const data = await asyncFs.readFile(filePath);

    const contentType = getContentType(filePath);
    res.setHeader('Content-Type', contentType);

    return data;
  };
}
