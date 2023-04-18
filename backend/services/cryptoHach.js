const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const config = require('../config');

function hach(value){
    preparedValue = value.toLowerCase().trim();
    const hashedValue = cryptojs.HmacSHA256(preparedValue, config.crypto.secret).toString();
    return hashedValue;
}
async function crypt(value){
    const cryptedValue = await bcrypt.hash(value, 10); 
    return cryptedValue;
}
async function compare(uncrypted,crypted){
    return bcrypt.compare(uncrypted, crypted);
}
module.exports = { 
    hach,
    crypt,
    compare
 };
