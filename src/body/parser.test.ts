import * as request from 'supertest';
import { getApp, getBodyParser } from '../../test';

describe('body parser test', () => {
  it('should parse application/json body', async () => {
    const app = getApp();

    app.use(getBodyParser());

    app.use((req, res) => {
      return req.body;
    });

    const response = await request(app.callback())
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ foo: 'bar' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ foo: 'bar' });
  });

  it('should parse application/x-www-form-urlencoded body', async () => {
    const app = getApp();

    app.use(getBodyParser());

    app.use((req, res) => {
      return req.body;
    });

    const response = await request(app.callback())
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('foo=bar');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ foo: 'bar' });
  });
});
