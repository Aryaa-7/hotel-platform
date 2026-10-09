export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) { super(message); }
}
export class ValidationError extends AppError {
  constructor(details: unknown, message = "Validation failed") { super("VALIDATION_FAILED", 400, message, details); }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") { super("UNAUTHORIZED", 401, message); }
}
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") { super("FORBIDDEN", 403, message); }
}
export class NotFoundError extends AppError {
  constructor(message = "Not found") { super("NOT_FOUND", 404, message); }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict") { super("CONFLICT", 409, message); }
}