import * as request from 'supertest';
import { getApp } from '../../test';
import { containerInstance } from '../container';
import { Service } from './service';

describe('Service Decorator', () => {
  it('should register class in the container, and its instance should be get', () => {
    @Service()
    class TestService {}

    expect(containerInstance.getInstance('service')).toEqual({
      testService: new TestService(),
    });
  });

  it('should access instance with req.services', async () => {
    @Service()
    class TestService {
      // eslint-disable-next-line class-methods-use-this
      test() {
        return 'hello douh';
      }
    }

    const app = getApp();
    app.use((req, res) => {
      return req.service.testService.test();
    });

    const response = await request(app.callback()).post('/ping').send({ name: 'Lee' });

    expect(response.text).toBe('hello douh');
  });
});
