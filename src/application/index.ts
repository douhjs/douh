import { createServer, ServerResponse } from 'http';
import * as onFinished from 'on-finished';
import { DouhRequest, DouhResponse } from '../http';
import { Exception } from '../exceptions';

// supply async await next() function
export type NextFunction = () => Promise<any>;
export type Middleware = (req: DouhRequest, res: DouhResponse, next: NextFunction) => any;
const primitiveType = new Set(['string', 'number', 'boolean', 'undefined', 'null']);

export class Application {
  private middleware: Middleware[];

  constructor() {
    this.middleware = [];
  }

  use(fn: Middleware) {
    this.middleware.push(fn);
    return this;
  }

  async listen(port?: number, listeningListener?: () => void, hostname?: string) {
    const server = createServer(
      {
        IncomingMessage: DouhRequest,
        ServerResponse: DouhResponse,
      },
      this.callback(),
    );
    return server.listen(port, hostname, undefined, listeningListener);
  }

  private compose(middleware: Middleware[]) {
    return (req: DouhRequest, res: DouhResponse, next: (typeof middleware)[number]) => {
      // eslint-disable-next-line consistent-return
      const dispatch = async (i: number): Promise<any> => {
        let index = -1;
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));
        index = i;
        let fn = middleware[i];
        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          const response = await fn(req, res, dispatch.bind(null, i + 1));

          if (response) {
            res.body = response;
          }
          return response;
        } catch (err) {
          this.onError(err, res);
        }
      };

      return dispatch(0).then(() => this.response(req, res));
    };
  }

  callback() {
    const fn = this.compose(this.middleware);
    const requestHandler = (req: DouhRequest, res: DouhResponse) => {
      return this.handleRequest(req, res, fn);
    };
    return requestHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  private async handleRequest(req: DouhRequest, res: DouhResponse, fnMiddleware: Middleware) {
    const onError = (err: any) => this.onError(err, res);
    onFinished(res, onError);
    try {
      await fnMiddleware(req, res, async () => {});
    } catch (err) {
      onError(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private response(_: DouhRequest, res: DouhResponse) {
    if (primitiveType.has(typeof res.body)) {
      res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
      res.end(res.body);
    } else {
      res.writeHead(res.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(res.body));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private onError(err: Exception, res: DouhResponse) {
    if (err) {
      const msg = err.stack || err.toString();
      if (err instanceof Exception) {
        res.statusCode = err.status;
        res.body = err.data.errorMessage || err.message || 'Internal Server Error';
        console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
      } else {
        res.statusCode = 500;
        res.body = 'Internal Server Error';
        console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
      }
    }
  }
}
