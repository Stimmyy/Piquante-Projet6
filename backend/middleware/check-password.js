const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message: 'Format de mot de passe invalide (8caractères minimum devant inclure maj, min, chiffre'});
    } else {
        next();
    }
};