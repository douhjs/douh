declare module 'http' {
  interface IncomingMessage {
    body?: Record<string, any>;
    query: Record<string, any>;
    params: Record<string, any>;
    service: Record<string, any>;
    files: RequestFiles;
  }

  interface ServerResponse {
    body?: any;
  }
}

type ClassType<T = unknown> = new (...args: any[]) => T;

type RequestFiles = {
  [key: string]: {
    fieldName: string;
    fileName: string;
    fileContent: string;
  }[];
};
