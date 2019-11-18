import bodyParser from './body-parser.conf';
import cpuUsageThrottle from './cpu-usage-throttle.conf';
import getAuditLogConf from './get-audit-log.conf';
import queryParser from './query-parser.conf';
import server from './server.conf';
import throttle from './throttle.conf';

import { IConfig } from '../types';

const config: IConfig = {
  apiDir: `${process.cwd()}/api`,
  bodyParser,
  cpuUsageThrottle,
  dateParser: 60,
  env: (process.env.NODE_ENV || 'development').trim(),
  queryParser,
  requiredVariables: [],
  server,
  throttle,
  useAuditLogger: true,
  useMongo: false,
  useRequestLogger: true,
};

export { getAuditLogConf };

export default config;
