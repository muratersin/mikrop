import { plugins, ServerOptions } from 'restify';

import bodyParser from './body-parser.conf';
import cpuUsageThrottle from './cpu-usage-throttle.conf';
import getAuditLogConf from './get-audit-log.conf';
import queryParser from './query-parser.conf';
import server from './server.conf';
import throttle from './throttle.conf';

export interface IConfig {
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

const config: IConfig = {
  bodyParser,
  cpuUsageThrottle,
  dateParser: 60,
  env: (process.env.NODE_ENV || 'development').trim(),
  queryParser,
  requiredVariables: [
    'JWT_SECRET',
  ],
  server,
  throttle,
  useAuditLogger: true,
  useMongo: false,
  useRequestLogger: true,
};

export { getAuditLogConf };

export default config;
