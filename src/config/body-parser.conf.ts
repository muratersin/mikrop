import os from 'os';

import { plugins } from 'restify';

const config: plugins.BodyParserOptions = {
  hash: 'sha1',
  keepExtensions: false,
  mapFiles: false,
  mapParams: true,
  maxBodySize: 0,
  maxFieldsSize: 2 * 1024 * 1024,
  multiples: true,
  overrideParams: false,
  rejectUnknown: true,
  requestBodyOnGet: false,
  reviver: undefined,
  uploadDir: os.tmpdir(),
};

export default config;
