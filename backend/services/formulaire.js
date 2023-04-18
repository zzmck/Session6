const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const Sauce = require('../models/Sauce');

const sanitize = (value) => {
  return sanitizeHtml(value);
};

async function isMail(req) {
  req.body.email = sanitize(req.body.email);
  await body('email', 'Please include a valid email').isEmail().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Invalid email');
  }
  return req.body.email;
}
async function isPassword(req) {
  req.body.password = sanitize(req.body.password);
  await body('password', 'Password is required').exists().run(req);
  await body('password', 'Password too short min : 6').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Invalid password');
  }
  return req.body.password
}
async function sauceExist(name) {
  const sauce = await Sauce.findOne({ name: name });
  return sauce !== null; 
}

module.exports = { 
  isMail,
  isPassword,
  sauceExist
};
 