import { DEFAULT_ERROR_MESSAGE } from "../consts/consts";
import type { ApiErrorResponse } from "../types/auth.types";

/**
 * Extracts an error message from various error types.
 * @param error - The error object to extract the message from.
 * @returns A string representing the error message.
**/
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error; //already extracted message

  const err = error as ApiErrorResponse; //error from BE shape
  return typeof err?.response?.data?.message === "string"
    ? err?.response?.data?.message
    : error instanceof Error //error from FE shape
    ? error?.message : DEFAULT_ERROR_MESSAGE;
}
