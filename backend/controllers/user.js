const User = require('../models/user');   // Utilise le modèle d'utilisateur
const bcrypt = require('bcrypt');        // Hash de mot de passe
const jwt = require ('jsonwebtoken');    //Gestion de token
require('dotenv').config();              // Dotenv pour garder le token secret



// Signup = Fonction pour enregistrer un utilisateur. Cette fonction va utiliser Bcrypt pour hash le mot de passe.
// Pas de hash d'email par soucis de praticité si besoin de contacter un utilisateur/vérifier si un utilisateur est enregistré.

exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then( () => res.status(201).json ({ message : 'Utilisateur créé'}))
        .catch(error => res.status(400).json({ error }));
    })

    .catch(error => req.status(500).json ({ error }))

};

// Login = Fonction pour connecter un utilisateur. Cette fonction va retrouver une combinaison mail/mot de passe (même hash).
// La fonction va aussi attribuer un token d'utilisateur qui expirera avec {expiresIn:} (ici 24h)

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => res.status(500)({ error }));
        }
    })

    .catch(error => res.status(500)({ error }));

};