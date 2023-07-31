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

export function paymentRequired(message?: string, data?: { errorMessage?: string }) {
  return new Exception(402, message ?? 'Payment Required', data);
}

export function forbidden(message?: string, data?: { errorMessage?: string }) {
  return new Exception(403, message ?? 'Forbidden', data);
}

export function notFound(message?: string, data?: { errorMessage?: string }) {
  return new Exception(404, message ?? 'Not Found', data);
}

export function methodNotAllowed(message?: string, data?: { errorMessage?: string }) {
  return new Exception(405, message ?? 'Method Not Allowed', data);
}

export function notAcceptable(message?: string, data?: { errorMessage?: string }) {
  return new Exception(406, message ?? 'Not Acceptable', data);
}

export function proxyAuthenticationRequired(message?: string, data?: { errorMessage?: string }) {
  return new Exception(407, message ?? 'Proxy Authentication Required', data);
}

export function requestTimeout(message?: string, data?: { errorMessage?: string }) {
  return new Exception(408, message ?? 'Request Timeout', data);
}

export function conflict(message?: string, data?: { errorMessage?: string }) {
  return new Exception(409, message ?? 'Conflict', data);
}

export function gone(message?: string, data?: { errorMessage?: string }) {
  return new Exception(410, message ?? 'Gone', data);
}

export function notImplemented(message?: string, data?: { errorMessage?: string }) {
  return new Exception(501, message ?? 'Not Implemented', data);
}
