import config from '../config';
import { IConfig } from '../types';

export function mergeConfig(o: IConfig): IConfig {
  const c = {
    ...config,
    ...o,
    requiredVariables: [
      ...(config.requiredVariables || []),
      ...(o.requiredVariables || [])
    ]
  };

  if (o.bodyParser) {
    c.bodyParser = {
      ...c.bodyParser,
      ...o.bodyParser,
    };
  }

  if (o.cpuUsageThrottle) {
    c.cpuUsageThrottle = {
      ...c.cpuUsageThrottle,
      ...o.cpuUsageThrottle,
    };
  }

  if (o.dateParser) {
    c.dateParser = o.dateParser;
  }

  if (o.queryParser) {
    c.queryParser = {
      ...c.queryParser,
      ...o.queryParser,
    };
  }

  if (o.server) {
    c.server = {
      ...c.server,
      ...o.server,
    };
  }

  if (o.throttle) {
    c.throttle = {
      ...c.throttle,
      ...o.throttle,
    };
  }

  return c;
}

export function checkRequiredEnvVars(conf: IConfig): void {
  const requiredVariables = conf.requiredVariables;
  if (Array.isArray(requiredVariables)) {
    requiredVariables.forEach((variableName: string) => {
      if (!process.env[variableName]) {
        throw new Error(`${variableName} is required env variable for running this server`);
      }
    });
  }
}
