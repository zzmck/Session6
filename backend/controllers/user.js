const services = require('../services');

async function login(req, res, next){
  if (!req.foundUser) {
    return res.status(401).json({ message: "login impossible" });
  }
  const cryptMail = req.mail;
  const uncryptedPass = req.body.password;
  const user = await services.user.get(cryptMail);
  const userId = user._id;
  const userMail = user.email;
  const userPass = user.password;
  const validPass = await services.crypto.compare(uncryptedPass, userPass);

  if ((userMail !== cryptMail) || !validPass) {
    return res.status(401).json({ message: "Paire identifiant / password incorrect" });
  }
  const tokenGenerated = services.token.create(userId);
  res.status(200).json({ userId: userId, token: tokenGenerated });
};
async function signup(req, res, next){
      if (req.foundUser) {
        return res.status(500).json({ message:"Signup impossible" });
      }
      const cryptedMail = req.mail;
      const cryptedPass = req.pass;
    try {
      const addUser = await services.user.add(cryptedMail, cryptedPass);
      res.status(200).json({ userId : addUser._id });
    } catch (error) {
      services.serveurLog.save.log('error', `Controllers user.js : Erreur ajout d'utilisateur ${error}`);
      next(error);
    }
};
  
module.exports = { 
  login,
  signup
};
