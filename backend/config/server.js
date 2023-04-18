function getConstants(env) {
    return {
    projectName: env.PROJECT_NAME || 'Piiquante',
    env: env.NODE_ENV || 'Devellopement',
    protocol: env.SRV_PROTOCOL || 'http',
    host: env.SRV_HOST || 'localhost:3000',
    port: env.SRV_PORT || 3000,
    logLevel : env.LOG_LEVEL || 'verbose',
    frontend : env.FRONT_URL || 'http://localhost:4200'
    };
};

module.exports = { 
  getConstants
};