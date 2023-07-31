import { router } from './routes';
import App from './lib/application';
import { bodyParser } from './lib/body';

const app = new App();
const hostname = 'localhost';
const port = 3000;

(async () => {
  app.use(bodyParser);
  app.use(async (req, res, next) => {
    console.log('middleware1');
    await next();
  });

  app.use(async (req, res, next) => {
    console.log('middleware2');
    await next();
  });

  app.use(router.middleware());

  await app.listen(port, hostname);
})();
