import restify, { Server } from 'restify';

import { getAuditLogConf, IConfig } from '../config';

import mongo from '../database/mongo';
import requestLogger from '../middleware/request-logger';
import setDefaultQueryParams from '../middleware/set-default-query-param';
import { checkRequiredEnvVars, mergeConfig } from './helpers.js';
import routeCollector from './route-collector';

export default function init(options: IConfig = {}) {
  const serviceConfig: IConfig = mergeConfig(options);

  checkRequiredEnvVars(serviceConfig);

  const server: Server = restify.createServer(serviceConfig.server);

  // plugins
  server.pre(restify.plugins.pre.context());
  server.pre(restify.plugins.pre.strictQueryParams());
  server.pre(restify.plugins.pre.sanitizePath());
  server.pre(restify.plugins.pre.strictQueryParams());
  server.pre(restify.plugins.cpuUsageThrottle(serviceConfig.cpuUsageThrottle));

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.dateParser(serviceConfig.dateParser));
  server.use(restify.plugins.queryParser(serviceConfig.queryParser));
  server.use(restify.plugins.gzipResponse());
  server.use(restify.plugins.throttle(serviceConfig.throttle));
  server.use(restify.plugins.requestLogger());
  server.use(restify.plugins.bodyParser(serviceConfig.bodyParser));

  if (serviceConfig.useAuditLogger) {
    server.on('after', restify.plugins.auditLogger(
      getAuditLogConf(server),
    ));
  }

  if (serviceConfig.useRequestLogger) {
    server.use(requestLogger);
  }

  if (serviceConfig.useMongo) {
    mongo.connect();
  }

  server.use(setDefaultQueryParams);

  routeCollector(server);

  return server;
}
