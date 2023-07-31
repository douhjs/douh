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

  it('should return plain text with return statement', async () => {
    const app = getApp();
    const router = new Router();

    router.get('/ping', (req, res) => {
      res.statusCode = 202;
      return 'pong';
    });

    app.use(router.middleware());

    const response = await request(app.callback()).get('/ping');
    expect(response.statusCode).toBe(202);
    expect(response.text).toBe('pong');
  });

  it('should return json with return statement', async () => {
    const app = getApp();
    const router = new Router();

    router.get('/ping', (req, res) => {
      res.statusCode = 202;
      return { message: 'pong' };
    });

    app.use(router.middleware());

    const response = await request(app.callback()).get('/ping');
    expect(response.statusCode).toBe(202);
    expect(response.body).toStrictEqual({ message: 'pong' });
  });

  // FIXME: router이용해서 ctx.body = ''로 return하는 방식은 작동하지 않음.
  it('should return plain text with "ctx.body = something" statement', async () => {
    const app = getApp();
    const router = new Router();

    router.get('/ping', (req, res) => {
      res.statusCode = 202;
      res.body = 'pong';
    });

    app.use(router.middleware());

    const response = await request(app.callback()).get('/ping');
    expect(response.statusCode).toBe(202);
    expect(response.text).toStrictEqual('pong');
  });

  it('should return json with "ctx.body = something" statement', async () => {
    const app = getApp();
    const router = new Router();

    router.get('/ping', (req, res) => {
      res.statusCode = 202;
      res.body = { message: 'pong' };
    });

    app.use(router.middleware());

    const response = await request(app.callback()).get('/ping');
    expect(response.statusCode).toBe(202);
    expect(response.body).toStrictEqual({ message: 'pong' });
  });
});
