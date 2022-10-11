const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require ('helmet');
const path = require('path');
const session = require('cookie-session');

require('dotenv').config();

const sauceRoutes = require ('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose
  .connect(process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();  

app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



const expiryDate = new Date(Date.now() +  3600000); // Expiration réglée à 1h
app.use(session({
  name : 'session',
  secret: process.env.secret_SESSION,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;