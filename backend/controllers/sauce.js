const files = require('fs');
const Sauce = require('../models/Sauce');
const services = require('../services');

async function getAll(req, res, next){
  Sauce.find()
  .then(allSauces => res.status(200).json(allSauces))
  .catch(error => 
    services.serveurLog.save.log('error', `Controler sauce.js : Erreur lors de la récupération de toutes les sauces ${error}`),
    res.status(400).json({ message:error }));
};
async function getId(req, res, next){
    Sauce.findById({_id:req.params.id})
    .then(oneSauce => res.status(200).json(oneSauce)
    )
    .catch(error => 
      services.serveurLog.save.log('error', `Controler sauce.js : Erreur lors de la récupération d'une sauce ${error}`),
      res.status(400).json({ message: error }));
};
async function post(req, res, next){
  const sauceObject = JSON.parse(req.body.sauce);
  try {
    const sauceExists = await services.formulaire.sauceExist(sauceObject.name);
    if (sauceExists) {
      res.status(409).json({ message: 'Une sauce porte déjà le même nom' });
      return; 
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
    return; 
  }
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.body.imageUrl}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
  .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => 
      services.serveurLog.save.log('error', `Controler sauce.js : Erreur lors de l'enregistrement de la sauce ${error}`),
      res.status(400).json({ message:error })
      );
  
};
async function postLikeDislike(req, res, next){
    try {
    const { userId, like } = req.body;
    const sauceId = req.params.id;
    let update;
    if (like === 1) {
      update = { $push: { usersLiked: userId }, $inc: { likes: 1 } };
    } else if (like === -1) {
      update = { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } };
    } else {
      const sauce = await Sauce.findById(sauceId);
      if (sauce.usersLiked.includes(userId)) {
        update = { $pull: { usersLiked: userId }, $inc: { likes: -1 } };
      } else if (sauce.usersDisliked.includes(userId)) {
        update = { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } };
      } else {
      }
    }
    
    if (update) {
      const sauce = await Sauce.findOneAndUpdate({ _id: sauceId }, update, { new: true });
      res.status(200).json({ sauce });
    } else {
      res.status(400).json({ message: "Invalid input" });
    }
    } catch (error) {
    services.serveurLog.save.log('error', `Controler sauce.js : Erreur like / dislike sauce ${error}`);
    res.status(500).json({ message: "Internal server error" });
    }
    
};
async function putId(req, res, next) {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) {
      return res.status(404).json({ message: "Sauce non trouvée" });
    }
    if (sauce.userId != req.user.sub) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    if(!req.body.imageUrl){
      const name=req.body.name;
      const manufacturer=req.body.manufacturer;
      const description= req.body.description;
      const mainPepper= req.body.mainPepper;
      const heat = req.body.heat;
    const updatedSauce = await Sauce.findOneAndUpdate(
      { _id: req.params.id },
      { name, manufacturer, description, mainPepper, heat },
      { new: true }
    );
    console.log(updatedSauce);
    res.status(200).json({ message: 'Objet modifié!', sauce: updatedSauce });
    } else {
      const { name, manufacturer, description, mainPepper, heat } = JSON.parse(req.body.sauce);
      const imageUrl = req.body.imageUrl;
      const updatedSauce = await Sauce.findOneAndUpdate(
        { _id: req.params.id },
        { name, manufacturer, description, mainPepper, heat, imageUrl:imageUrl },
        { new: true }
      );
      console.log(updatedSauce);
      res.status(200).json({ message: 'Objet modifié!', sauce: updatedSauce });
    }
  } catch (error) {
    services.serveurLog.save.log('error', `Controler sauce.js : Erreur lors de la modification de la sauce ${error}`);
    res.status(500).json({ message:error });
  }
};
async function deleteId(req, res, next){
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      if (!sauce) {
        res.status(404).json({ message: "Sauce not found" });
      } else if (sauce.userId != req.user.sub) {
        res.status(401).json({message: 'Not authorized'});
      } else {
        const imgName = sauce.imageUrl.split('/images/')[1];
        const imagePath = `images/${imgName}`;
        if (files.existsSync(imagePath)) {
          files.unlinkSync(imagePath);
        }
        Sauce.deleteOne({_id: req.params.id})
          .then(() => { 
            res.status(200).json({message: 'Objet supprimé !'})
          })
          .catch(error => {
            services.serveurLog.save.log('error', `Controler sauce.js : Erreur lors de la suppression de la sauce ${error}`);
            res.status(401).json({ error });
          });
      }
    })
    .catch(error => {
      services.serveurLog.save.log('error', `Controler sauce.js : Sauce introuvable lors de la suppression ${error}`);
      res.status(500).json({ error });
    });
};

module.exports = {
getAll,
getId,
post,
postLikeDislike,
putId,
deleteId
};
