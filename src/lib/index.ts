
import dotenv from 'dotenv';
import restifyErrors from 'restify-errors';

import { IConfig } from '../types';
import init from './init';
import logger from './logger';

export function run(options?: IConfig) {
  const ENV = (process.env.NODE_ENV || 'development').trim();

  if (ENV !== 'production') {
    dotenv.config();
  }

  logger.info('Process is running...');

  const PORT = process.env.PORT || 3000;
  const app = init(options);

  app.listen(PORT, () => {
    logger.info('%s listening at %s', app.name, app.url);
  });
}

export function getServer(options?: IConfig) {
  return init(options);
}

export const errors = restifyErrors;
