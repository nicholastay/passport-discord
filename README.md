# @atsumi/passport-discord

![npm](https://img.shields.io/npm/v/@atsumi/passport-discord)
![License](https://img.shields.io/github/license/3tatsu/passport-discord)
![Build Status](https://img.shields.io/github/actions/workflow/status/3tatsu/passport-discord/ci.yml)

## Description

`@atsumi/passport-discord` is a [Passport](http://www.passportjs.org/) strategy for authenticating
with [Discord](https://discord.com/). This strategy allows you to authenticate users using their Discord account in your
Node.js applications.

## Installation

You can install this package via npm or yarn:

```bash
pnpm add @atsumi/passport-discord
```

Or with npm:

```bash
npm install @atsumi/passport-discord
```

Or with yarn:

```bash
yarn add @atsumi/passport-discord
```

Or with bun:

```bash
bun add @atsumi/passport-discord
```

## Usage

Here is a simple example of how to use this strategy in a Node.js/Express application:

```javascript
const express = require('express');
const passport = require('passport');
const {DiscordStrategy} = require('@atsumi/passport-discord');

passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/discord/callback',
        scope: ['identify', 'email', 'guilds']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({discordId: profile.id}, (err, user) => {
            return done(err, user);
        });
    }
));

const app = express();

app.use(passport.initialize());

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
    passport.authenticate('discord', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/');
    });

app.listen(3000);
```

## Scripts

- **build:** Compiles the TypeScript files into JavaScript.
- **lint:** Runs ESLint on your TypeScript files.
- **lint:fix**: Runs ESLint and fixes any issues automatically.
- **start:** Starts the server using ts-node-dev for development with automatic reloads.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Author

3tatsu - [GitHub](https://github.com/3tatsu)

## Links

- [Repository](https://github.com/3tatsu/passport-discord)
- [NPM](https://www.npmjs.com/package/@atsumi/passport-discord)

# Code with ❤️
