const cryptoHach = require('./cryptoHach');
const formulaire = require('./formulaire');
const svrLogger = require('./svrLogger');
const token = require('./token');
const user = require('./user');
const images = require('./images');

module.exports = {
    crypto : cryptoHach,
    formulaire,
    serveurLog : svrLogger,
    token,
    user,
    images
};
