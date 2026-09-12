/**
 * Validates and returns the PORT environment variable or default value.
 * 
 * @param portEnv - The PORT environment variable value
 * @returns A valid port number between 0 and 65535
 * @throws Error if PORT is set to an invalid value
 */
export function getPort(portEnv?: string): number {
  const defaultPort = 4000;
  
  if (!portEnv) {
    return defaultPort;
  }
  
  const port = parseInt(portEnv, 10);
  
  if (isNaN(port)) {
    throw new Error(`Invalid PORT value: "${portEnv}" is not a number`);
  }
  
  if (port < 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${port} is out of range (0-65535)`);
  }
  
  return port;
}
