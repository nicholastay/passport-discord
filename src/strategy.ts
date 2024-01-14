import OAuth2Strategy, {StrategyOptionsWithRequest, VerifyFunctionWithRequest} from "passport-oauth2";

export class Strategy extends OAuth2Strategy {
	/**
     * Creates an instance of Strategy.
     *
     * @param {StrategyOptionsWithRequest} options - Strategy options with request.
     * @param {VerifyFunctionWithRequest} verify - Verification function with request.
     */
	constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest) {
		options = options || {};
		options.authorizationURL = options.authorizationURL || "https://discord.com/api/oauth2/authorize";
		options.tokenURL = options.tokenURL || "https://discord.com/api/oauth2/token";
		options.scopeSeparator = options.scopeSeparator || " ";

		super(options, verify);
		this.name = "discord";
		this._oauth2.useAuthorizationHeaderforGET(true);
	}

	userProfile(accessToken: string, done: (err?: (Error | null), profile?: any) => void) {
		this._oauth2.get("https://discord.com/api/v10/users/@me", accessToken, (err, body: any) => {
			if (err) {
				return done(new Error(`Failed to fetch user profile: ${err}`));
			}

			try {
				const json = JSON.parse(body);
				done(null, json);
			} catch (e) {
				done(e as null);
			}
		});
	}

	checkScope(scope: string, accessToken: string, cb: (err?: (Error | null), value?: any) => void) {
		this._oauth2.get("https://discord.com/api/v10/users/@me", accessToken, (err, body: any) => {
			if (err) {
				return cb(new Error(`Failed to fetch user profile: ${err}`));
			}

			try {
				const parsedData = JSON.parse(body);
				if (parsedData.scope.includes(scope)) {
					cb(null, true);
				} else {
					cb(null, false);
				}
			} catch (e) {
				cb(e as null);
			}
		});
	}

	authorizationParams(options: any): object {
		return {prompt: options.prompt};
	}
}