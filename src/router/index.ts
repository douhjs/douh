import { IncomingMessage, ServerResponse } from 'http';
import { Middleware, NextFunction } from '../application';
import { notFound } from '../exceptions';

const availableMethods = ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'PUT'];
type AvailableMethods = (typeof availableMethods)[number];

// 라우트 정보를 저장할 객체 타입 정의
type Route = {
  method: AvailableMethods;
  path: string;
  handler: Middleware;
};

// 라우터 클래스
export class Router {
  routes: Route[] = [];

  // GET 메서드 라우터 등록
  get(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'GET', path, handler });
  }

  // POST 메서드 라우터 등록
  post(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'POST', path, handler });
  }

  // PATCH 메서드 라우터 등록
  patch(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'PATCH', path, handler });
  }

  // DELETE 메서드 라우터 등록
  delete(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'DELETE', path, handler });
  }

  // HEAD 메서드 라우터 등록
  head(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'HEAD', path, handler });
  }

  // PUT 메서드 라우터 등록
  put(path: AvailableMethods, handler: Middleware) {
    this.routes.push({ method: 'PUT', path, handler });
  }

  middleware() {
    return async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
      const { method, url } = req;

      const registeredRoute = this.routes
        .filter((route) => route.method === method)
        .find((route) => {
          const splittedRoute = route.path.split('/');
          const [endpoint, queryString] = url?.split('?') ?? [];
          const searchParams = new URLSearchParams(queryString);
          const splittedUrl = endpoint.split('/');
          if (splittedRoute.length !== splittedUrl?.length) {
            return false;
          }

          const params: Record<string, any> = {};
          for (let i = 0; i < splittedRoute.length; i++) {
            if (splittedRoute[i].startsWith(':')) {
              params[splittedRoute[i].slice(1)] = splittedUrl[i];
            } else if (splittedRoute[i] !== splittedUrl[i]) {
              return false;
            }
          }
          req.params = params;

          const queryPrams: Record<string, any> = {};
          for (const [key, value] of searchParams) {
            queryPrams[key] = value;
          }
          req.query = queryPrams;

          return true;
        });

      if (registeredRoute) {
        const body = await registeredRoute.handler(req, res, next);

        if (body) {
          res.body = body;
        }
        await next();
      } else {
        throw notFound(`Cannot ${method} ${url}`);
      }
    };
  }
}
