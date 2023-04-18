const jwt = require("jsonwebtoken");
const config = require('../config');

function create(userId){
  return jwt.sign({ 
    type: config.token.accessToken.type, 
      algorith: config.token.accessToken.algorithm, 
      audience: config.token.accessToken.audience, 
      issuer: config.token.accessToken.issuer, 
      sub: userId 
    }, config.token.accessToken.secret, { 
      expiresIn: config.token.accessToken.expiresIn 
    });
}
function get(req){
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  return token;
}

module.exports = { 
    create,
    get
};