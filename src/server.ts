import { handleRequest } from './routes';
import App from './lib/application';

const app = new App();
const hostname = 'localhost';
const port = 3000;
app.use(async (req, res, next) => {
  console.log(req.method, req.url);
  await next();
});

app.use(async (req, res, next) => {
  await next();
});

app.use(handleRequest);

(async () => {
  await app.listen(port, hostname);
})();
