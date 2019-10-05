import { plugins } from 'restify';

const config: plugins.ThrottleOptions = {
  burst: 10, // Max 10 concurrent requests (if tokens)
  ip: true, // throttle per IP
  overrides: {
    '192.168.1.1': {
      burst: 0,
      rate: 0, // unlimited
    },
  },
  rate: 0.5, // Steady state: 1 request / 2 seconds
};

export default config;
