/**
 * Shared utilities for API route handlers (server-side only).
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type JsonRecord = Record<string, unknown>;

/** Extract a human-readable error message from an API response body. */
export const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (typeof data === "object" && data !== null) {
    const record = data as JsonRecord;
    if (typeof record.error === "string" && record.error.trim()) return record.error;
    if (typeof record.message === "string" && record.message.trim()) return record.message;
  }
  return fallback;
};
