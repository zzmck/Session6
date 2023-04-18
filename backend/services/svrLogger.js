const config = require('../config');
const winston = require('winston');

const path = require('path');
const appRoot = require('app-root-path');

const save = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(appRoot.path, 'logs', 'errors.log'),
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.File({
      filename: path.join(appRoot.path, 'logs', 'warnings.log'),
      level: 'warn',
      format: winston.format.json()
    }),
    new winston.transports.Console({
      level: config.server.logLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

module.exports = { save };