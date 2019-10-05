import { plugins } from 'restify';

const config: plugins.CpuUsageThrottleOptions = {
  halfLife: 500,
  interval: 250,
  limit: 0.75,
  max: 1,
};

export default config;
