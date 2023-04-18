# HotTakes BackendAPI

This project was generated with NodeJs Express.

## Install

Run `npm install` for node and depencies

## Lauch backend :

Run `npm start` to run project.

## Create personnal environement configuration

You can modify this value or use defaults value in `/config` folder.
Create `.env` at the start project.

#Project used in `/config/server.js`
PROJECT_NAME = 'NAME'
NODE_ENV = 'PRODUCTION'

#Server configuration used in `/config/server.js`
SRV_PROTOCOL = 'http'
SRV_HOST = 'localhost:3000'
SRV_PORT='3000'

#Front url used in `/config/server.js`
FRONT_URL = 'http://localhost:4200'

#Log configuration in console used in `/config/server.js`
LOG_LEVEL='verbose'

#Database configuration used in `/config/db.js`
DB_TYPE = 'mongodb://'
DB_URL = '0.0.0.0:27017'
DB_COLLECTION = 'HotTakes'

#Token configuration used in `/config/token.js`
ACCESS_TOKEN_TYPE = 'YOUR TYPE'
ACCESS_TOKEN_ALGORITHM = 'YOUR ALGORITHM'
ACCESS_TOKEN_SECRET='YOUR TOKEN SECRET'
ACCESS_TOKEN_EXPIRES_IN = 3600
ACCESS_TOKEN_AUDIENCE = 'YOUR URL FRONTEND'
ACCESS_TOKEN_ISSUER = 'YOUR URL BACKEND'

#Bcrypt configuration used in `/config/crypto.js`
SECRET_KEY='YOUR SECRET KEY'


## How to use this API
Routes for `user` :
POST /api/auth/signup
POST /api/auth/login

Routes for `sauce` :
GET /api/sauces/ => all sauces
GET /api/sauces/:id => one sauce
POST /api/sauces/ => create sauce
POST /api/sauces/id/like => like or dislike sauces
PUT /api/sauces/:id => modification sauce
DELETE /api/sauces/:id => delete sauce

## Models database
base `user` :
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }

base `sauces` :
    userId: {type: String, required: true},
    name: {type: String, required: true, unique:true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
