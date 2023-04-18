const multer = require('multer');
const files = require('fs');
const path = require('path');
const services = require('../services');
const config = require('../config');

async function verification(req, res, next) {
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
      services.images.checkType(file, cb);
    }
  }).single('image');

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Erreur dans le format de l'image" });
    } else if (err) {
      return res.status(400).json({ message: "Erreur inconnue lors de l'upload de l'image" });
    }
    if (!req.file) {
      return next();
    }
    const imageExtension = req.file.originalname.split('.')[1];
    const imageBuffer = req.file.buffer;

    try {
      const findSauce = await services.images.find(req.params.id);
      if(findSauce){
        const imageBdd = findSauce.imageUrl.split('/images/')[1];
        files.unlinkSync(path.join('images', imageBdd));
      }
      imageResized = await services.images.resize(imageBuffer);
      imageCompressed = await services.images.compress(imageResized);
      imageNewName = `${Date.now()}.${imageExtension}`;
      imageSave = services.images.save(imageCompressed, imageNewName);
      req.body.imageUrl = `${config.server.protocol}://${config.server.host}/images/${imageNewName}`;
      next();
    } catch (err) {
      services.serveurLog.save.log('error', `Middelware images.js : Erreur lors du traitement de l'image ${err}`);
      return res.status(500).json({ message: "Erreur lors du traitement de l'image" });
    }
  });
}


module.exports = { verification };
