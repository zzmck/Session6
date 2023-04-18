function getConstants(env) {
  return {
      accessToken: {
        type: env.ACCESS_TOKEN_TYPE || 'Bearer',
        algorithm: env.ACCESS_TOKEN_ALGORITHM || 'HS256',
        secret: env.ACCESS_TOKEN_SECRET || '509E2D3140398B5B10CFBFB308342D47A19D84502F2F1870D28BF54DBE7C6754',
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN || 3600,
        audience: env.ACCESS_TOKEN_AUDIENCE || 'http://localhost:4200',
        issuer: env.ACCESS_TOKEN_ISSUER || 'http://localhost:3000'
      }
    };
};

module.exports = { 
  getConstants
};
  