import { Next, Request, Response } from 'restify';

export default function setDefaultQueryParams(req: Request, res: Response, next: Next) {
  req.query.page = req.query.page || 1;
  req.query.limit = req.query.limit || 10;
  next();
}
