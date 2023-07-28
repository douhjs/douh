import * as http from 'http';

// supply async await next() function
export type NextFunction = () => Promise<any>;
type Middleware = (req: http.IncomingMessage, res: http.ServerResponse, next: NextFunction) => any;

export default class Application {
  private middleware: Middleware[];

  constructor() {
    this.middleware = [];
  }

  use(fn: Middleware) {
    this.middleware.push(fn);
    return this;
  }

  async listen(port?: number, hostname?: string, listeningListener?: () => void) {
    const server = http.createServer(this.callback());
    return server.listen(port, hostname, undefined, listeningListener);
  }

  // eslint-disable-next-line class-methods-use-this
  private compose(middleware: Middleware[]) {
    return (req: http.IncomingMessage, res: http.ServerResponse, next: (typeof middleware)[number]) => {
      const dispatch = (i: number): Promise<any> => {
        let index = -1;
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));
        index = i;
        let fn = middleware[i];
        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      return dispatch(0);
    };
  }

  callback() {
    const fn = this.compose(this.middleware);
    const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
      return this.handleRequest(req, res, fn);
    };
    return requestHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse, fnMiddleware: Middleware) {
    return fnMiddleware(req, res, async () => ({}));
  }
}
