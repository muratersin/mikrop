import { plugins, Server } from 'restify';

import log from '../lib/logger';

export default function getAuditLogConf(server: Server): plugins.AuditLoggerOptions {
  return {
    event: 'after',
    log,
    printLog: true,
    server,
  };
}
