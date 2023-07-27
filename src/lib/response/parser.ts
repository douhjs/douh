import * as http from 'http';

const primitiveType = new Set(['string', 'number', 'boolean', 'undefined', 'null']);

export function responseParser(res: http.ServerResponse, response: any) {
  if (primitiveType.has(typeof response)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(response);
  }
}
