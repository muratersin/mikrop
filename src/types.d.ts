import { Request } from 'restify';

export interface IRequest extends Request {
  set: (name: string, data: any) => void,
  get: (name: string) => string
}
