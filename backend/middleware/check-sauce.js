const validate = require ('mongoose-validator');

exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3,30],
        message: "Le nom doit faire entre 3 et 30caractères",
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Le nom de la sauce ne doit être composé que de chiffres et de lettres",
    }),
];

exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Le nom du fabricant doit comprendre entre 3 et 20caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Le nom du fabricant ne doit être composé que de chiffres et de lettres",
    }),
];

exports.descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 150],
        message: "La description de la sauce doit comprendre entre 10 et 150caractères",
    }),
    validate({
        validator:'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "La description de la sauce ne doit être composée que de chiffres et de lettres",
    }),
];

exports.pepperValidator = [
    validate({
        validator: 'isLength',
        arguments:[3, 20],
        message: "Le principal ingrédient doit comprendre entre 3 et 20caractères"
    }),
    validate({
        validator:'isAlphanumeric',
        message: "Ne peut comprendre qu'entre 3 et 20caractères alphanumériques",
    }),
];