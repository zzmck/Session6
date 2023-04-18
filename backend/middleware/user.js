const services = require('../services');

async function formulaire(req, res, next) {
  try {
    const email = await services.formulaire.isMail(req);
    const password = await services.formulaire.isPassword(req);
    req.mail = services.crypto.hach(email);
    req.pass = await services.crypto.crypt(password);
    return next();
  } catch (error) {
    services.serveurLog.save.log('error', `Middelware user.js : Erreur cryptage du formulaire ${error}`);
    return res.status(400).json({ error: error.message });
  }
}
async function isExist(req, res, next){
    await services.user.isExist(req.mail).then((founded)=>{
      req.foundUser = founded;
    });
    next();
};

  module.exports = { 
    isExist,
    formulaire
  };