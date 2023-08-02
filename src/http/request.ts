import * as http from 'http';
import * as net from 'net';

export class DouhRequest extends http.IncomingMessage {
  body?: Record<string, any>;

  params: Record<string, any> = {};

  constructor(socket: net.Socket) {
    super(socket);
  }
}
