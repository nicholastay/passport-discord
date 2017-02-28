# passport-discord

Passport strategy for authentication with [Discord](http://discordapp.com) through the OAuth 2.0 API.

At time of writing there is no official page/documentation for this, so information can be read off the example project, such as how to set up an API application [here](http://github.com/vishnevskiy/discord-oauth2-example).

## Usage
`npm install passport-discord --save`

#### Configure Strategy
The Discord authentication strategy authenticates users via a Discord user account and OAuth 2.0 token(s). A Discord API client ID, secret and redirect URL must be supplied when using this strategy. The strategy also requires a `verify` callback, which receives the access token and an optional refresh token, as well as a `profile` which contains the authenticated Discord user's profile. The `verify` callback must also call `cb` providing a user to complete the authentication.

```javascript
var DiscordStrategy = require('passport-discord').Strategy;

passport.use(new DiscordStrategy(
    {
        clientID: 'id',
        clientSecret: 'secret',
        callbackURL: 'callbackURL'
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ discordId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));
```

#### Authentication Requests
Use `passport.authenticate()`, and specify the `'discord'` strategy to authenticate requests.

For example, as a route middleware in an Express app:

```javascript
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/secretstuff') // Successful auth
});
```

If using the `bot` scope, the `permissions` option can be set to indicate
specific permissions your bot needs on the server ([permission codes](https://discordapp.com/developers/docs/topics/permissions)):

```javascript
app.get("/auth/discord", passport.authenticate("discord", {permissions: 66321471}));
```


## Examples
An Express server example can be found in the `/example` directory. Be sure to `npm install` in that directory to get the dependencies.

## Credits
* Jared Hanson - used passport-github to understand passport more and kind of as a base.
