import jwt from 'jsonwebtoken';
import { Next, Response } from 'restify';
import { NotAuthorizedError } from 'restify-errors';

import { IRequest } from '../types';

function verifyToken(req: IRequest, res: Response, next: Next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new NotAuthorizedError());
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.set('user', decoded);
    next();
  } catch (err) {
    next(err);
  }
}

export {
  verifyToken,
};
