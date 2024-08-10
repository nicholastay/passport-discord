const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { DiscordStrategy } = require("../dist");

const app = express();

/**
 * Middleware to handle session management.
 */
app.use(session({
	secret: "mysecret",
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Serialize user instance to the session.
 *
 * @param {object} user - The user object.
 * @param {Function} done - The callback function.
 */
passport.serializeUser((user, done) => {
	done(null, user);
});

/**
 * Deserialize user instance from the session.
 *
 * @param {object} obj - The user object.
 * @param {Function} done - The callback function.
 */
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

/**
 * Use the DiscordStrategy within Passport.
 *
 * @param {object} options - The strategy options.
 * @param {Function} verify - The verify callback function.
 */
passport.use(new DiscordStrategy({
	clientID: "CLIENT_ID",
	clientSecret: "CLIENT_SECRET",
	callbackURL: "CALLBACK_URL",
	scope: ["identify", "email"],
}, (req, accessToken, refreshToken, profile, done) => done(null, profile)));

/**
 * Route to handle the root path.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get("/", (req, res) => {
	res.send("Hello World!");
});

/**
 * Route to initiate Discord authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get("/login", passport.authenticate("discord"));

/**
 * Route to handle the callback from Discord authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get("/callback",
	passport.authenticate("discord", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/info");
	});

/**
 * Route to display user information.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get("/info", (req, res) => {
	res.json(req.user);
});

/**
 * Start the Express server.
 *
 * @param {number} port - The port number.
 * @param {Function} callback - The callback function.
 */
app.listen(3_000, () => {
	console.log("Example app listening on port 3000!");
});
