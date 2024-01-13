"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_oauth2_1 = tslib_1.__importDefault(require("passport-oauth2"));
/**
 * Strategy for OAuth2 authentication, particularly configured for Discord.
 *
 * @param {StrategyOptionsWithRequest} options - Strategy options with request.
 * @param {VerifyFunctionWithRequest} verify - Verification function with request.
 * @returns An instance of OAuth2Strategy.
 */
const Strategy = (options, verify) => {
    // Set default values for options if not provided
    options = options || {};
    options.authorizationURL = options.authorizationURL || "https://discord.com/api/oauth2/authorize";
    options.tokenURL = options.tokenURL || "https://discord.com/api/oauth2/token";
    options.scopeSeparator = options.scopeSeparator || " ";
    // Return an instance of OAuth2Strategy with the configured options
    return new passport_oauth2_1.default(options, verify);
};
exports.default = Strategy;
