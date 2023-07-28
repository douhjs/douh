import * as http from 'http';
import { Router } from '../lib/router';

const router = new Router();

router.get('/ping', () => {
  return 'pong';
});

router.post('/', (req) => {
  return 'good';
});

export function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const { method, url } = req;

  const response = (() => {
    switch (method) {
      case 'GET':
        return router.getRoutes[`${url}`] ? router.getRoutes[`${url}`](req, res) : 'Not Found';
      case 'POST':
        return router.postROutes[`${url}`] ? router.postROutes[`${url}`](req, res) : 'Not Found';
      default:
        return 'Method not supported';
    }
  })();

  res.body = response;
}
