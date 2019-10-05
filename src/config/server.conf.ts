import { ServerOptions } from 'restify';

import log from '../lib/logger';

const config: ServerOptions = {
  dtrace: false,
  handleUncaughtExceptions: false,
  log,
  name: process.env.NAME || 'Mikrop',
  onceNext: true,
  strictNext: true,
};

export default config;
