import type {StrategyOptionsWithRequest, VerifyFunctionWithRequest} from "passport-oauth2";
import OAuth2Strategy from "passport-oauth2";

/**
 * Strategy for OAuth2 authentication, particularly configured for Discord.
 *
 * @param {StrategyOptionsWithRequest} options - Strategy options with request.
 * @param {VerifyFunctionWithRequest} verify - Verification function with request.
 * @returns An instance of OAuth2Strategy.
 */
const Strategy = (options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest): OAuth2Strategy => {
	// Set default values for options if not provided
	options = options || {};
	options.authorizationURL = options.authorizationURL || "https://discord.com/api/oauth2/authorize";
	options.tokenURL = options.tokenURL || "https://discord.com/api/oauth2/token";
	options.scopeSeparator = options.scopeSeparator || " ";

	// Return an instance of OAuth2Strategy with the configured options
	return new OAuth2Strategy(options, verify);
};

export default Strategy;