module.exports = (req, res, next) => {
        const EmailValidation = (email) => {
            let emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/
            let isRegexTrue = emailRegex.test(email)
            isRegexTrue ? next () : res.status(400).json({message: 'mail non valide'});
        }
        EmailValidation(req.body.email)
};