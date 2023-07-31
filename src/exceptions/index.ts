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
  return new Exception(401, message ?? 'Bad Request', data);
}

export function forbidden(message?: string, data?: { errorMessage?: string }) {
  return new Exception(403, message ?? 'Bad Request', data);
}

export function notFound(message?: string, data?: { errorMessage?: string }) {
  return new Exception(404, message ?? 'Not Found', data);
}

export function gone(message?: string, data?: { errorMessage?: string }) {
  return new Exception(410, message ?? 'Not Found', data);
}
