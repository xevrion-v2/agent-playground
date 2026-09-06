const stripTrailingSlash = (path: string): string => path.replace(/\/+/g, '/').replace(/\/$/, '');

export { stripTrailingSlash };
