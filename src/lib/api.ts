const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const ensureLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export const getApiUrl = (path: string): string => {
  const normalizedPath = ensureLeadingSlash(path);
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return `${trimTrailingSlash(configuredBaseUrl)}${normalizedPath}`;
  }

  return `/api${normalizedPath}`;
};
