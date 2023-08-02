import { DouhRequest } from '../http';

declare module 'http' {
  function createServer<
    Request extends typeof DouhRequest = typeof DouhRequest,
    Response extends typeof DouhREsponse = typeof DouhREsponse,
  >(requestListener?: RequestListener<Request, Response>): Server<Request, Response>;
  function createServer<
    Request extends typeof DouhRequest = typeof DouhRequest,
    Response extends typeof DouhREsponse = typeof DouhREsponse,
  >(
    options: ServerOptions<Request, Response>,
    requestListener?: RequestListener<Request, Response>,
  ): Server<Request, Response>;
}
