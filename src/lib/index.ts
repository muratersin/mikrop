
import dotenv from 'dotenv';

import { IConfig } from '../config';

import init from './init';
import logger from './logger';

const ENV = (process.env.NODE_ENV || 'development').trim();

if (ENV !== 'production') {
  dotenv.config();
}

export function run(options?: IConfig) {
  logger.info('Process is running...');
  setTimeout(() => {
    const PORT = process.env.PORT || 3000;
    const app = init(options);

    app.listen(PORT, () => {
      logger.info('%s listening at %s', app.name, app.url);
    });
  }, 2000);
}

export function getServer(options?: IConfig) {
  return init(options);
}
