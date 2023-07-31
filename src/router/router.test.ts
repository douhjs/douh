import * as request from 'supertest';
import { getApp } from '../../test/app';
import { Router } from './';

describe('router test', () => {
  it('should be defined', () => {
    expect(Router).toBeDefined();
  });

  it('should instance can be created', () => {
    const router = new Router();
    expect(router).toBeDefined();
  });

  it('should be worked as router', async () => {
    const app = getApp();
    const router = new Router();

    router.get('/ping', (req, res) => {
      res.statusCode = 203;
      return 'pong';
    });

    app.use(router.middleware());

    const response = await request(app.callback()).get('/ping');
    expect(response.statusCode).toBe(203);
  });
});
