function getConstants(env) {
  return {
      url: env.DB_URL || '0.0.0.0:27017',
      type: env.DB_TYPE || 'mongodb://',
      collection: env.DB_COLLECTION || 'HotTakes'
    };
};

module.exports = { 
  getConstants
};