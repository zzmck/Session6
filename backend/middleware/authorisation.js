const jwt = require("jsonwebtoken");
const config = require('../config');
const services = require('../services');

async function access(req, res, next){
  const token = services.token.get(req);
  try {
    const getUserId = jwt.verify(token, config.token.accessToken.secret);
    req.user = getUserId;
    next();
  } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { 
  access
};