import * as http from 'http';

export class Router {
  public getRoutes: Record<string, any> = {
    '/': (req: any, res: any) => 'Hello World!',
  };

  get(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => any) {
    this.getRoutes[path] = handler;
  }
}
