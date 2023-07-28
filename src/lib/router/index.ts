import * as http from 'http';
import { NextFunction } from '../application';

export class Router {
  public getRoutes: Record<string, any> = {
    '/': (req: any, res: any) => 'Hello World!',
  };

  public postROutes: Record<string, any> = {};

  get(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse, next: NextFunction) => any) {
    this.getRoutes[path] = handler;
  }

  post(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse, next: NextFunction) => any) {
    this.postROutes[path] = handler;
  }
}
