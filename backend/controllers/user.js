const services = require('../services');

async function login(req, res, next) {
  const cryptMail = req.mail;
  const uncryptedPass = req.body.password;

  try {
    const user = await services.user.get(cryptMail);

    if (!user) {
      return res.status(401).json({ message: "Adresse e-mail non trouvée" });
    }

    const userId = user._id;
    const userMail = user.email;
    const userPass = user.password;
    const validPass = await services.crypto.compare(uncryptedPass, userPass);

    if ((userMail !== cryptMail) || !validPass) {
      return res.status(401).json({ message: "Paire identifiant / mot de passe incorrecte" });
    }

    const tokenGenerated = services.token.create(userId);
    res.status(200).json({ userId: userId, token: tokenGenerated });
  } catch (error) {
    services.serveurLog.save.log('error', `Controllers user.js : Erreur lors de la connexion de l'utilisateur ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function signup(req, res, next) {
  const cryptedMail = req.mail;
  const cryptedPass = req.pass;

  try {
    const addUser = await services.user.add(cryptedMail, cryptedPass);
    res.status(200).json({ message: "Nouvel utilisateur enregistré" });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: 'Adresse e-mail déjà utilisée' });
    } else {
      services.serveurLog.save.log('error', `Controllers user.js : Erreur ajout d'utilisateur ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
  
module.exports = { 
  login,
  signup
};
