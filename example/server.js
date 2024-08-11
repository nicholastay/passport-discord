const process = require("node:process");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { DiscordStrategy } = require("../dist");

passport.use(
	new DiscordStrategy({
		clientID: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/discord/callback",
		scope: ["identify", "email", "guilds"],
	}, (req, accessToken, refreshToken, profile, done) => {
		done(null, profile);
	}),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const app = express();

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/discord", passport.authenticate("oauth2"));

app.get("/auth/discord/callback",
	passport.authenticate("oauth2", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/profile");
	});

app.get("/profile", (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect("/auth/discord");
	}

	res.json(req.user);
});

const port = process.env.PORT || 3_000;
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
