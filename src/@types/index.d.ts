declare module 'http' {
  interface IncomingMessage {
    body?: Record<string, any>;
    query: Record<string, any>;
    params: Record<string, any>;
  }

  interface ServerResponse {
    body?: any;
  }
}
