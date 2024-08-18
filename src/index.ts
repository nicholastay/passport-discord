import { Buffer } from "node:buffer";
import type { OutgoingHttpHeaders } from "node:http";
import type { APIUser, OAuth2Scopes, Snowflake } from "discord-api-types/v10";
import type { Request } from "express";
import type { StateStore, VerifyCallback } from "passport-oauth2";
import OAuth2Strategy from "passport-oauth2";

/**
 * Type definition for the verify function used in the DiscordStrategy.
 *
 * @param req - The request object.
 * @param accessToken - The access token.
 * @param refreshToken - The refresh token.
 * @param profile - The user profile.
 * @param verified - The callback to call when verification is complete.
 */
export type VerifyFunction = (
	req: Request,
	accessToken: string,
	refreshToken: string,
	profile: APIUser,
	verified: VerifyCallback,
) => void;

/**
 * Type definition for the options used in the DiscordStrategy.
 */
export type StrategyOptions = {
	authorizationURL: string;
	callbackURL?: string | undefined;
	clientID: Snowflake;
	clientSecret: string;
	customHeaders?: OutgoingHttpHeaders | undefined;
	passReqToCallback: true;
	pkce?: boolean | undefined;
	proxy?: any;
	scope?: OAuth2Scopes | OAuth2Scopes[] | undefined;
	scopeSeparator?: string | undefined;
	sessionKey?: string | undefined;
	skipUserProfile?: any;
	state?: any;
	store?: StateStore | undefined;
	tokenURL: string;
};

/**
 * DiscordStrategy class for authenticating with Discord using OAuth2.
 *
 * @extends OAuth2Strategy
 */
export class DiscordStrategy extends OAuth2Strategy {
	/**
	 * Constructs a new DiscordStrategy instance.
	 *
	 * @param options - The strategy options.
	 * @param verify - The verify function.
	 */
	public constructor(options: StrategyOptions, verify: VerifyFunction) {
		options.authorizationURL = options.authorizationURL ?? "https://discord.com/api/oauth2/authorize";
		options.tokenURL = options.tokenURL ?? "https://discord.com/api/oauth2/token";
		options.scopeSeparator = options.scopeSeparator ?? " ";
		super(options, verify);
		this.name = "discord";
		this._oauth2.useAuthorizationHeaderforGET(true);
	}

	/**
	 * Retrieves the user profile from Discord.
	 *
	 * @param accessToken - The access token.
	 * @param done - The callback to call when the profile is retrieved.
	 */
	public userProfile<T extends APIUser>(accessToken: string, done: (err?: (Error | null), profile?: T | null) => void): void {
		this._oauth2.get("https://discord.com/api/v10/users/@me", accessToken, (err, body) => {
			if (err) {
				done(new Error("Failed to fetch user profile"), null);
				return;
			}

			try {
				let json: T;
				if (typeof body === "string") {
					json = JSON.parse(body);
				} else if (body instanceof Buffer) {
					json = JSON.parse(body.toString());
				} else {
					return;
				}

				done(null, json);
			} catch (error) {
				if (error instanceof Error) {
					done(error, null);
				} else {
					done(new Error("Failed to parse user profile"), null);
				}
			}
		});
	}

	/**
	 * Returns the authorization parameters.
	 *
	 * @param options - The options object.
	 * @returns The authorization parameters.
	 */
	public authorizationParams(options: any): object {
		return { prompt: options.prompt };
	}
}
