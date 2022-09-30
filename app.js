const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const sauceRoutes = require ('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Stimmy:PasswordStimmy@cluster0.wjs4jx4.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();  

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.use('/api/auth', userRoutes);
app.use('/api/stuff', sauceRoutes);

module.exports = app;