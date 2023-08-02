import * as request from 'supertest';
import { getApp, getBodyParser } from '../../test';
import { Router } from '.';

describe('router test', () => {
  it('should be defined', () => {
    expect(Router).toBeDefined();
  });

  it('should instance can be created', () => {
    const router = new Router();
    expect(router).toBeDefined();
  });

  describe('GET test', () => {
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

    it('should return plain text with "res.body = something" statement', async () => {
      const app = getApp();
      const router = new Router();

      router.get('/ping', (req, res) => {
        res.statusCode = 202;
        res.body = 'pong';
      });

      app.use(router.middleware());

      const response = await request(app.callback()).get('/ping');
      expect(response.statusCode).toBe(202);
      expect(response.text).toBe('pong');
    });

    it('should return json with "res.body = something" statement', async () => {
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

    it('should work with multiple routes', async () => {
      const app = getApp();
      const router = new Router();

      router.get('/ping', (req, res) => {
        res.body = 'ok';
      });

      router.get('/ping2', (req, res) => {
        res.body = 'ok2';
      });

      app.use(router.middleware());

      const response = await request(app.callback()).get('/ping');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('ok');

      const response2 = await request(app.callback()).get('/ping2');
      expect(response2.statusCode).toBe(200);
      expect(response2.text).toBe('ok2');
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.get('/ping/:name', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).get('/ping/arthur');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.get('/user/:name/profile', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).get('/user/arthur/profile');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.get('/user/:name/profile/:id', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).get('/user/arthur/profile/1');
      expect(response.body).toStrictEqual({ name: 'arthur', id: '1' });
    });
  });

  describe('POST test', () => {
    it('should get json response from api call', async () => {
      const app = getApp();
      const router = new Router();

      router.post('/ping', (req, res) => {
        res.statusCode = 201;
        res.body = { message: 'created' };
      });

      app.use(router.middleware());

      const response = await request(app.callback()).post('/ping');
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message: 'created' });
      expect(response.text).toBe(JSON.stringify({ message: 'created' }));
    });

    it('should get request body in middleware', async () => {
      const app = getApp();
      const router = new Router();

      router.post('/ping', (req, res) => {
        res.statusCode = 201;
        return req.body;
      });

      app.use(getBodyParser());
      app.use(router.middleware());

      const response = await request(app.callback()).post('/ping').send({ name: 'Lee' });
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ name: 'Lee' });
      expect(response.text).toBe(JSON.stringify({ name: 'Lee' }));
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.post('/ping/:name', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).post('/ping/arthur');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.post('/user/:name/profile', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).post('/user/arthur/profile');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.post('/user/:name/profile/:id', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).post('/user/arthur/profile/1');
      expect(response.body).toStrictEqual({ name: 'arthur', id: '1' });
    });
  });

  describe('PATCH test', () => {
    it('should get json response from api call', async () => {
      const app = getApp();
      const router = new Router();

      router.patch('/ping', (req, res) => {
        res.body = { message: 'updated' };
      });

      app.use(router.middleware());

      const response = await request(app.callback()).patch('/ping');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message: 'updated' });
      expect(response.text).toBe(JSON.stringify({ message: 'updated' }));
    });

    it('should get request body in middleware', async () => {
      const app = getApp();
      const router = new Router();

      router.patch('/ping', (req, res) => {
        return req.body;
      });

      app.use(getBodyParser());
      app.use(router.middleware());

      const response = await request(app.callback()).patch('/ping').send({ name: 'Lee' });
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ name: 'Lee' });
      expect(response.text).toBe(JSON.stringify({ name: 'Lee' }));
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.patch('/ping/:name', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).patch('/ping/arthur');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.patch('/user/:name/profile', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).patch('/user/arthur/profile');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.patch('/user/:name/profile/:id', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).patch('/user/arthur/profile/1');
      expect(response.body).toStrictEqual({ name: 'arthur', id: '1' });
    });
  });

  describe('DELETE test', () => {
    it('should get json response from api call', async () => {
      const app = getApp();
      const router = new Router();

      router.delete('/ping', (req, res) => {
        res.body = { message: 'deleted' };
      });

      app.use(router.middleware());

      const response = await request(app.callback()).delete('/ping');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message: 'deleted' });
      expect(response.text).toBe(JSON.stringify({ message: 'deleted' }));
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.delete('/ping/:name', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).delete('/ping/arthur');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.delete('/user/:name/profile', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).delete('/user/arthur/profile');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.delete('/user/:name/profile/:id', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).delete('/user/arthur/profile/1');
      expect(response.body).toStrictEqual({ name: 'arthur', id: '1' });
    });
  });

  describe('HEAD test', () => {
    it('should be available to set statusCode in route', async () => {
      const app = getApp();
      const router = new Router();

      router.head('/ping', (req, res) => {
        res.statusCode = 204;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).head('/ping');
      expect(response.status).toBe(204);
    });

    it('should be available to set header in route', async () => {
      const app = getApp();
      const router = new Router();

      router.head('/ping', (req, res) => {
        res.setHeader('Connection', 'Keep-Alive');
      });

      app.use(router.middleware());

      const response = await request(app.callback()).head('/ping');
      expect(response.headers.connection).toBe('Keep-Alive');
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.head('/ping/:name', (req, res) => {
        res.setHeader('name', req.params.name);
      });

      app.use(router.middleware());

      const response = await request(app.callback()).head('/ping/arthur');
      expect(response.headers.name).toBe('arthur');
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.head('/user/:name/profile', (req, res) => {
        res.setHeader('name', req.params.name);
      });

      app.use(router.middleware());

      const response = await request(app.callback()).head('/user/arthur/profile');
      expect(response.headers.name).toBe('arthur');
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.head('/user/:name/profile/:id', (req, res) => {
        res.setHeader('name', req.params.name);
        res.setHeader('id', req.params.id);
      });

      app.use(router.middleware());

      const response = await request(app.callback()).head('/user/arthur/profile/1');
      expect(response.headers.name).toBe('arthur');
      expect(response.headers.id).toBe('1');
    });
  });

  describe('PUT test', () => {
    it('should get json response from api call', async () => {
      const app = getApp();
      const router = new Router();

      router.put('/ping', (req, res) => {
        res.body = { message: 'updated' };
      });

      app.use(router.middleware());

      const response = await request(app.callback()).put('/ping');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message: 'updated' });
      expect(response.text).toBe(JSON.stringify({ message: 'updated' }));
    });

    it('should get request body in middleware', async () => {
      const app = getApp();
      const router = new Router();

      router.put('/ping', (req, res) => {
        return req.body;
      });

      app.use(getBodyParser());
      app.use(router.middleware());

      const response = await request(app.callback()).put('/ping').send({ name: 'Lee' });
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ name: 'Lee' });
      expect(response.text).toBe(JSON.stringify({ name: 'Lee' }));
    });

    it('should get params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.put('/ping/:name', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).put('/ping/arthur');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get params object when url has params between routes', async () => {
      const app = getApp();
      const router = new Router();

      router.put('/user/:name/profile', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).put('/user/arthur/profile');
      expect(response.body).toStrictEqual({ name: 'arthur' });
    });

    it('should get multi params object when url has params', async () => {
      const app = getApp();
      const router = new Router();

      router.put('/user/:name/profile/:id', (req, res) => {
        return req.params;
      });

      app.use(router.middleware());

      const response = await request(app.callback()).put('/user/arthur/profile/1');
      expect(response.body).toStrictEqual({ name: 'arthur', id: '1' });
    });
  });
});
