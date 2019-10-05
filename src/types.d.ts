import { Request, plugins, ServerOptions } from 'restify';

export interface IRequest extends Request {
  set: (name: string, data: any) => void,
  get: (name: string) => string
}

export interface IConfig {
  apiDir: string;
  env?: string;
  requiredVariables?: string[];
  useRequestLogger?: boolean;
  useAuditLogger?: boolean;
  useMongo?: boolean;
  dateParser?: number;
  server?: ServerOptions;
  throttle?: plugins.ThrottleOptions;
  bodyParser?: plugins.BodyParserOptions;
  queryParser?: plugins.QueryParserOptions;
  cpuUsageThrottle?: plugins.CpuUsageThrottleOptions;
}
