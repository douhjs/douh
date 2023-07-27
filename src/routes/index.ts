import * as http from 'http';
import { Router } from '../lib/router';
import { responseParser } from '../lib/response';

const router = new Router();

router.get('/ping', () => {
  return 'pong';
});

export function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const { method, url } = req;

  const response = (() => {
    switch (method) {
      case 'GET':
        return router.getRoutes[`${url}`] ? router.getRoutes[`${url}`](req, res) : 'Not Found';
      default:
        return 'Method not supported';
    }
  })();

  responseParser(res, response);
}
