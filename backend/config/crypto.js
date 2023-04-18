function getConstants(env) {
  return {
      secret: env.SECRET_KEY || '$2a$09$zP4rPHGYerMKIaFM5Vo8Xeb4Btvp2dyRsroMjJIldNJec1zXjbFJm'
    };
};

module.exports = { 
  getConstants
};