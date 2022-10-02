const passwordValidator = require('password-validator');

//Création de schéma
const passwordSchema = new passwordValidator();


passwordSchema
.is().min(8)                                   // Minimum 8 caractères         
.is().max(32)                                  // Maximum 32 caractères
.has().uppercase(1)                             // Doit avoir au moins une majuscule
.has().lowercase(1)                             // Doit avoir au moins une minuscule
.has().digits(1)                                // Doit avoir au moins un chiffre
.has().not().spaces()                          // Ne doit pas avoir d'espace

module.exports = passwordSchema;
