import { Router } from '../lib/router';

export const router = new Router();

router.get('/', (req, res) => {
  res.body = 'Hello World';
});
