const express  = require('express')
  , session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('../lib').Strategy
  , app      = express();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const scopes = ['identify', 'email', /* 'connections', (it is currently broken) */ 'guilds', 'guilds.join'];
const prompt = 'consent'

passport.use(new Strategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:5000/callback',
    scope: scopes,
    prompt,
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', passport.authenticate('discord', { scope: scopes, prompt: prompt }), (req, res) => {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => { res.redirect('/info') } // auth success
);
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
app.get('/info', checkAuth, (req, res) => {
    //console.log(req.user)
    res.json(req.user);
});


function checkAuth (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
} //`function` syntax required due to hoisting


app.listen(5000, err => {
    if (err) return console.log(err)
    console.log('Listening at http://localhost:5000/')
})
