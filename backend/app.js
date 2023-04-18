const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const services = require('./services');
const app = express();

const usersRoutes = require("./routes/users");
const saucesRoutes = require('./routes/sauces');
let ip;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const allowedOrigins = [config.server.frontend];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  dnsPrefetchControl: true,
  expectCt: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: true,
  referrerPolicy: true,
  xssFilter: true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.server.frontend);
  res.setHeader('Cross-Origin-Resource-Policy', config.server.frontend);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongoose.connect(`${config.db.type}${config.db.url}/${config.db.collection}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    services.serveurLog.save.log('info', `Connected to MongoDb`);
  })
  .catch((error) => {
    services.serveurLog.save.log('error', `Unable to connect to MongoDB : ${error}`);    
  });
app.use('/images',  (req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', config.server.frontend);
  next();
  },express.static(path.join(__dirname, 'images')));
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', saucesRoutes);
app.use((req, res) => {
  let ip = req.headers['x-forwarded-for'] || "Ip masked";
  services.serveurLog.save.log('error', `${ip} : Try to access at unexist route ${req.url}`);
  res.status(404).send('Page not found on this API');
});

module.exports = app;