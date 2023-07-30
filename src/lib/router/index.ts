import { IncomingMessage, ServerResponse } from 'http';
import { Middleware, NextFunction } from '../application';

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
      const registeredRoute = this.routes.find(
        (route) => route.method.toLowerCase() === method?.toLowerCase() && route.path === url,
      );
      if (registeredRoute) {
        const body = await registeredRoute.handler(req, res, next);
        res.body = body;
        await next();
      } else {
        res.statusCode = 404;
        res.body = `Cannot Get ${url}`;
      }
    };
  }
}
