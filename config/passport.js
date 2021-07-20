const passport = require('passport');
const LocalStrategy = require('passport-local');
var crypto = require('crypto');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    const user = loadUserFromDb(email);

    //need pass 'password' to get '5f4dcc3b5aa765d61d8327deb882cf99' as hash
    const passHash = crypto.createHash('md5').update(password).digest('hex');

    if (!user  || user.password !== passHash) {
        return done(null, false, {errors: 'email or password are invalid'});
    }
    return done(null, user);
}));

//should load user by email or return null if user not exist
const loadUserFromDb = (email) => ({email: email, password: '5f4dcc3b5aa765d61d8327deb882cf99'})
