import { Next, Request, Response } from 'restify';

export default function requestLogger(req: Request, res: Response, next: Next) {
  req.log.info(`${req.method} -> ${req.url}`);
  next();
}
