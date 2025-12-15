export const needsEncoding = (url: string) => {
  // Matches anything not in the safe character set
  return /[^A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]/.test(url);
};
