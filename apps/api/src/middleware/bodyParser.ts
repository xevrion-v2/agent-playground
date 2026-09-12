import { Request, Response, NextFunction } from 'express';

const configureBodyParser = (app: any) => {
  // Configure conservative JSON body size limit
  app.use(require('express').json({ limit: '100kb' }));
  app.use(require('express').urlencoded({ limit: '100kb', extended: true }));
};

export default configureBodyParser;

/**
 * Expected body size limit: 100kb
 * This provides a conservative limit to prevent excessive payload attacks
 * while maintaining usability for normal API operations.
 */