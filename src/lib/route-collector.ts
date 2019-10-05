import fs from 'fs';
import path from 'path';

import { Server } from 'restify';

import { verifyToken } from '../middleware/auth';
import { IConfig } from '../types';
import { Methods } from './constants';

export default function router(server: Server, config: IConfig) {
  const apiDir = config.apiDir;

  fs.readdirSync(apiDir).forEach((file) => {
    const dir = path.resolve(apiDir, file);
    const stats = fs.lstatSync(dir);

    if (!stats.isDirectory()) {
      return;
    }

    const conf = require(`${dir}/config.json`);

    if (!conf.routes) {
      return;
    }

    const handlers = require(dir);

    Object.keys(conf.routes).forEach((route) => {
      Object.keys(conf.routes[route]).forEach((method: any) => {
        const handlerChain = conf.routes[route][method]
          .handlers
          .map((c: string) => {
            if (!handlers[c]) {
              throw new Error(`Missing handler: ${c}`);
            }

            return handlers[c];
          });

        if (!conf.routes[route][method].public) {
          handlerChain.unshift(verifyToken);
        }

        switch (method) {
          case Methods.GET:
            server.get(route, handlerChain);
            break;
          case Methods.POST:
            server.post(route, handlerChain);
            break;
          case Methods.PUT:
            server.put(route, handlerChain);
            break;
          case Methods.DELETE:
            server.del(route, handlerChain);
            break;
          case Methods.OPTIONS:
            server.opts(route, handlerChain);
            break;
        }
      });
    });
  });
}
