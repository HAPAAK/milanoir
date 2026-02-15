const ensureLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export const getApiUrl = (path: string): string => {
  const normalizedPath = ensureLeadingSlash(path);
  return `/api${normalizedPath}`;
};
