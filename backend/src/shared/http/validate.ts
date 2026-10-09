import type { ZodType } from "zod";
import { ValidationError } from "../errors/app-error.js";

export function parse<T>(schema: ZodType<T>, data: unknown): T {
  const r = schema.safeParse(data);
  if (!r.success) throw new ValidationError(r.error.flatten());
  return r.data;
}