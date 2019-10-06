
# Mikrop

Mikrop is a rapid api development library based on restify.

[![npm version](https://img.shields.io/npm/v/mikrop.svg?style=flat-square)](https://www.npmjs.com/package/mikrop)
[![Build Status](https://travis-ci.org/muratersin/mikrop.svg?style=flat-square&branch=master)](https://travis-ci.org/muratersin/mikrop)

Mikrop contain common methods and packages for required every micro service.

## Usage

installing:

```bash
  npm i --save mikrop
```


## Configuration
```js
const mikrop = require('mikrop');

// default config
const config = {
  apiDir: `${process.cwd()}/api`,
  requiredVariables: ['JWT_SECRET'],
  useRequestLogger: true,
  useAuditLogger: true,
  useMongo: false,
  dateParser: 60,
  server: ServerOptions,
  throttle: ThrottleOptions,
  bodyParser: BodyParserOptions,
  queryParser: QueryParserOptions,
  cpuUsageThrottle: CpuUsageThrottleOptions,
};

mikrop.run(config); // mikrop listening at http://[::]:3000
```

#### apiDir: string
  Absolute path of where contain your api handlers and config files.

#### requiredVariables: [string]
Array of required env variable for working your service.

####  useRequestLogger: boolean
If you want to see request logs on terminal, it's must be true.

####  useAuditLogger: boolean
Detailed error log for monitoring.

####  useMongo: boolean
If it's true and you have a valid env called MONGO_URI, service connect to database when starting.

## Route And Handler Definition
Folder structure is most important thing for Mikrop. 

Your folder structure must be as shown below:
```bash
my-microservice
  |-- api -> This folder path can change with configuration object.
    |--user
      |--index.js    -> Contain route handler methods.
      |--config.json -> Contain path and methods.
  |-- lib
  |-- index.js
  ...etc
```

iapi/user/ndex.js:

```js
module.exports.getUser = (req, res, next) => {
  res.send('Get user');
};
module.exports.updateUser = (req, res, next) => {
  res.send('Update user');
};
module.exports.formValidation = (req, res, next) => {
  res.send('Form validation');
};
```

api/user/config.json:

```json
{
  "name": "User api",
  "description": "Sample user api description",
  "routes": {
    "/user": {
      "get": {
        "handlers": ["getUser"],
        "public": true
      }
    },
    "/user/:id": {
      "put": {
        "handlers": ["formValidation", "updateUser"]
      }
    }
  }
}
```

index.js:
```js
const mikrop = require('mikrop');

mikrop.run(); // mikrop listening at http://[::]:3000
```

mikrop wants some env variable for running.

```bash
  NAME=Service Name
  PORT=3000
  URL=localhost
  NODE_ENV=development
  JWT_SECRET=YOUR_JWT_SECRET
```

Only JWT_SECRET of these variables is required, if mikrop can't find JWT_SECRET in env vars, process throw an error for missing required env variable. You can add more required env variable for specific services.

Configuration:

```js
const mikrop = require('mikrop');

const options = {
  requiredVariables: [
    'JWT_SECRET',
    'MY_ANOTHER_REQUIRED_ENV_VARIABLE',
  ],
},

mikrop.run(options); // mikrop listening at http://[::]:3000
```
