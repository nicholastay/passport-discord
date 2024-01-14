const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('../dist/strategy').Strategy;

const app = express();

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new DiscordStrategy({
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL',
    scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    return done(null, profile);
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', passport.authenticate('discord'));

app.get('/callback',
    passport.authenticate('discord', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/info');
    });

app.get('/info', (req, res) => {
    res.json(req.user);
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});