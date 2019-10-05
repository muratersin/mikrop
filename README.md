
# Mikrop

Mikrop is a rapid api development library based on restify.

[![npm version](https://img.shields.io/npm/v/mikrop.svg?style=flat-square)](https://www.npmjs.com/package/mikrop)
![license](https://img.shields.io/hexpm/l/mikrop?style=flat-square)

Mikrop contain common methods and packages for required every services.

## Usage

installing:

```bash
  npm i mikrop
```

running script must be in root directory of your projects:

```js
const mikrop = require('mikrop');

mikrop.run(); // mikrop listening at http://[::]:3000
```

## Route And Handler Definition

```bash
root
  |-- api
    |--user
      |--index.js    -> Contain route handler methods.
      |--config.json -> Contain path and methods.
```

index.js:

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

config.json:

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
