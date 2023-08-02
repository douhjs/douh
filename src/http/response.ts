import * as http from 'http';
import { DouhRequest } from './request';

export class DouhResponse<Request extends DouhRequest = DouhRequest> extends http.ServerResponse<Request> {
  body?: any;

  constructor(req: Request) {
    super(req);
  }
}
