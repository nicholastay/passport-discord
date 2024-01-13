# passport-discord (By AtsumiFlex)

passport-discord is a fork of the "https://github.com/nicholastay/passport-discord" project, tailored for OAuth2
authentication with Discord. It
simplifies
integrating Discord authentication into your Node.js applications.

## Installation

To install passport-discord, run the following command in your project directory:

```
npm install --save
```

## Usage

Here's a basic example of how to use passport-discord in a Node.js application:

```typescript
import Strategy from 'passport-discord';

// Define your strategy options
const strategyOptions = {
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL',
    scope: ['identify', 'email']
};

// Define your verify function
const verifyFunction = async (accessToken, refreshToken, profile, cb) => {
    // Your verification logic here
    await User.findOrCreate({discordId: profile.id}, (err, user) => {
        return cb(err, user);
    });
}

// Create a new AtsumiFlex strategy
const discordStrategy = new Strategy(strategyOptions, verifyFunction);

// Use this strategy in your application
```

Replace `'YOUR_CLIENT_ID'`, `'YOUR_CLIENT_SECRET'`, and `'YOUR_CALLBACK_URL'` with your Discord application's details.

## Contributing

Contributions to passport-discord are welcome. Please submit a pull request or open an issue if you have any suggestions
or
improvements.

## License

This project is licensed under the MIT License.
