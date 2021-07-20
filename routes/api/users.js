const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const jwt = require('jsonwebtoken');

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const {body: {user}} = req;

    if (!user.email || !user.password) {
        return res.status(422).json({
            error: 'not all fields filed',
        });
    }

    //call local strategy which defined in 'config/passport.js'
    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            return res.cookie("jwt", generateJWT(user.email)).status(200).end();
        }

        return res.status(400).send(info);
    })(req, res, next);
});

//return true only if user authorized
router.get('/hello', auth.required, (req, res, next) => {
    res.status(200).send('hello');
});

const generateJWT = (email) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

module.exports = router;
