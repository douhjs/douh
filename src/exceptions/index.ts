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

export function lengthRequired(message?: string, data?: { errorMessage?: string }) {
  return new Exception(411, message ?? 'Length Required', data);
}

export function preconditionFailed(message?: string, data?: { errorMessage?: string }) {
  return new Exception(412, message ?? 'Precondition Failed', data);
}

export function payloadTooLarge(message?: string, data?: { errorMessage?: string }) {
  return new Exception(413, message ?? 'Payload Too Large', data);
}

export function uriTooLong(message?: string, data?: { errorMessage?: string }) {
  return new Exception(414, message ?? 'URI Too Long', data);
}

export function unsupportedMediaType(message?: string, data?: { errorMessage?: string }) {
  return new Exception(415, message ?? 'Unsupported Media Type', data);
}

export function rangeNotSatisfiable(message?: string, data?: { errorMessage?: string }) {
  return new Exception(416, message ?? 'Range Not Satisfiable', data);
}

export function expectationFailed(message?: string, data?: { errorMessage?: string }) {
  return new Exception(417, message ?? 'Expectation Failed', data);
}

export function imATeapot(message?: string, data?: { errorMessage?: string }) {
  return new Exception(418, message ?? "I'm a teapot", data);
}

export function misdirectedRequest(message?: string, data?: { errorMessage?: string }) {
  return new Exception(421, message ?? 'Misdirected Request', data);
}

export function unprocessableEntity(message?: string, data?: { errorMessage?: string }) {
  return new Exception(422, message ?? 'Unprocessable Entity', data);
}

export function locked(message?: string, data?: { errorMessage?: string }) {
  return new Exception(423, message ?? 'Locked', data);
}

export function failedDependency(message?: string, data?: { errorMessage?: string }) {
  return new Exception(424, message ?? 'Failed Dependency', data);
}

export function tooEarly(message?: string, data?: { errorMessage?: string }) {
  return new Exception(425, message ?? 'Too Early', data);
}

export function upgradeRequired(message?: string, data?: { errorMessage?: string }) {
  return new Exception(426, message ?? 'Upgrade Required', data);
}

export function preconditionRequired(message?: string, data?: { errorMessage?: string }) {
  return new Exception(428, message ?? 'Precondition Required', data);
}

export function tooManyRequests(message?: string, data?: { errorMessage?: string }) {
  return new Exception(429, message ?? 'Too Many Requests', data);
}

export function requestHeaderFieldsTooLarge(message?: string, data?: { errorMessage?: string }) {
  return new Exception(431, message ?? 'Request Header Fields Too Large', data);
}

export function unavailableForLegalReasons(message?: string, data?: { errorMessage?: string }) {
  return new Exception(451, message ?? 'Unavailable For Legal Reasons', data);
}

export function notImplemented(message?: string, data?: { errorMessage?: string }) {
  return new Exception(501, message ?? 'Not Implemented', data);
}

export function notInjected(message?: string, data?: { errorMessage?: string }) {
  return new Exception(500, message ?? 'Not Injected', data);
}
