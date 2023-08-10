import App, { Router, Service, bodyParser } from '.';
import { containerInstance } from './container';

const app = new App();

app.use(bodyParser);

const router = new Router();

@Service()
class TestService {
  // eslint-disable-next-line class-methods-use-this
  public sayHello() {
    return 'Hello';
  }
}

router.get('/ping', (req, res, next) => {
  return 'pong';
});

router.post('/ping', (req, res, next) => {
  return 'pong';
});

app.use(router.middleware());
const port = 3333;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
