const http = require('http');
const config = require('./config');
const services = require('./services');
const app = require('./app');

services.serveurLog.save.log('verbose', `Launch project ${config.server.projectName} on mode ${config.server.env}`);


const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};

const port = normalizePort(config.server.port);
app.set('port', port);
  
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    services.serveurLog.save.log('error', `error : ${error}`);
    throw error;
  }

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      services.serveurLog.save.log('error', `error : ${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      services.serveurLog.save.log('error', `error : ${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const url = address.address === '::' ? `localhost:${address.port}`:`${address.address}:${address.port}`;
    services.serveurLog.save.log('info', `listening on ${config.server.protocol}://${url}`);
});
  
server.listen(port);
