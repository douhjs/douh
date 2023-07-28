import { handleRequest } from './routes';
import App from './lib/application';
import { bodyParser } from './lib/body';

const app = new App();
const hostname = 'localhost';
const port = 3000;

app.use(bodyParser);
app.use(async (req, res, next) => {
  await next();
});

app.use(async (req, res, next) => {
  await next();
});

app.use(handleRequest);

(async () => {
  await app.listen(port, hostname);
})();
