export class Exception extends Error {
  status: number;

  message: string;

  data: {
    errorMessage?: string;
  };

  constructor(statusCode: number, message: string, data?: { errorMessage?: string }) {
    super(message);
    this.status = statusCode;
    this.message = message;
    this.data = data ?? {};
  }
}

export function badRequest(message?: string, data?: { errorMessage?: string }) {
  return new Exception(400, message ?? 'Bad Request', data);
}

export function unauthorized(message?: string, data?: { errorMessage?: string }) {
  return new Exception(401, message ?? 'Unauthorized', data);
}

export function forbidden(message?: string, data?: { errorMessage?: string }) {
  return new Exception(403, message ?? 'Forbidden', data);
}

export function notFound(message?: string, data?: { errorMessage?: string }) {
  return new Exception(404, message ?? 'Not Found', data);
}

export function gone(message?: string, data?: { errorMessage?: string }) {
  return new Exception(410, message ?? 'Gone', data);
}

export function notImplemented(message?: string, data?: { errorMessage?: string }) {
  return new Exception(501, message ?? 'Not Implemented', data);
}
