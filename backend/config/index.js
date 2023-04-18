const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
const crypto = require('./crypto');
const db = require('./db');
const server = require('./server');
const token = require('./token');

let env = dotenv.config({});
if (!env.error){
  env = dotenvParseVariables(env.parsed);
}

const cryptoConstants = crypto.getConstants(env);
const dbConstants = db.getConstants(env);
const serverConstants = server.getConstants(env);
const tokenConstants = token.getConstants(env);

module.exports = {
  crypto: cryptoConstants,
  db: dbConstants,
  server: serverConstants,
  token: tokenConstants
};
