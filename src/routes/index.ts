import { Router } from '../lib/router';

export const router = new Router();

router.get('/', () => {
  return {
    data: 'Hello World',
  };
});
