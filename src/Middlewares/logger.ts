import { Response, Request, NextFunction } from 'express';

export const logger = ({ method, url, body }: Request, _: Response, next: NextFunction) => {
  console.log(`Got ${method} method request to ${url} with following body: ${JSON.stringify(body)}`);
  next();
};
