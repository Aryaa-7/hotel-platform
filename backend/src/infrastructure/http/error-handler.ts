import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../../shared/errors/app-error.js";

export const notFound: RequestHandler = (_req, _res, next) => next(new NotFoundError("Route not found"));

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const requestId = String(req.id);
  if (err instanceof AppError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details, requestId } });
    return;
  }
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: { code: "INTERNAL", message: "Something went wrong", requestId } });
};