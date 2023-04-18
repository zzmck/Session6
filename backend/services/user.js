const User = require('../models/User');

async function add(cryptedMail, cryptedPass){
    const user = new User({ email: cryptedMail, password: cryptedPass });
    await user.save();
    return user;
}
async function isExist(userMail){
    const user = await User.findOne({ email: userMail });
    if(user){
        return true;
    }
    return false;
}
async function get(userMail){
    const user = await User.findOne({ email: userMail });
    return user;
}
async function getId(userId){
    const user = await User.findOne({ _id: userId });
    return user;
}

module.exports = { 
    add,
    isExist,
    get,
    getId
 };
