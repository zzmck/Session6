const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middleware = require('../middleware');
 
router.post('/signup', middleware.user.formulaire,middleware.user.isExist, controllers.user.signup);
router.post('/login', middleware.user.formulaire,middleware.user.isExist, controllers.user.login);
module.exports=router;