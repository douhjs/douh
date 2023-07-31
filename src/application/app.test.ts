import * as request from 'supertest';
import { Application } from './';
describe('Douh application test', () => {
  it('should be defined', () => {
    expect(Application).toBeDefined();
  });

  it('should instance can be created', () => {
    const app = new Application();
    expect(app).toBeDefined();
  });

  describe('middleware test', () => {
    it('should middleware can return plain text', async () => {
      const app = new Application();

      app.use((req, res) => {
        res.statusCode = 202;
        return 'ok';
      });

      const response = await request(app.callback()).get('/');
      expect(response.status).toBe(202);
      expect(response.text).toBe('ok');
    });

    it('should middleware can return json', async () => {
      const app = new Application();

      app.use((req, res) => {
        res.statusCode = 202;
        return { message: 'ok' };
      });

      const response = await request(app.callback()).get('/');
      expect(response.status).toBe(202);
      expect(response.body).toStrictEqual({ message: 'ok' });
    });

    it('should middleware can also use "res.body = something"', async () => {
      const app = new Application();

      app.use((req, res) => {
        res.statusCode = 202;
        res.body = { message: 'ok' };
      });

      const response = await request(app.callback()).get('/');
      expect(response.status).toBe(202);
      expect(response.body).toStrictEqual({ message: 'ok' });
    });
  });
});
