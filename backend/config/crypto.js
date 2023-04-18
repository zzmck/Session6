function getConstants(env) {
  return {
      secret: env.SECRET_KEY || 'qsdfghjk12345'
    };
};

module.exports = { 
  getConstants
};