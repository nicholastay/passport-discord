"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
class Strategy extends passport_oauth2_1.default {
    /**
     * Creates an instance of Strategy.
     *
     * @param {StrategyOptionsWithRequest} options - Strategy options with request.
     * @param {VerifyFunctionWithRequest} verify - Verification function with request.
     */
    constructor(options, verify) {
        options = options || {};
        options.authorizationURL = options.authorizationURL || "https://discord.com/api/oauth2/authorize";
        options.tokenURL = options.tokenURL || "https://discord.com/api/oauth2/token";
        options.scopeSeparator = options.scopeSeparator || " ";
        super(options, verify);
        this.name = "discord";
        this._oauth2.useAuthorizationHeaderforGET(true);
    }
    userProfile(accessToken, done) {
        this._oauth2.get("https://discord.com/api/v10/users/@me", accessToken, (err, body) => {
            if (err) {
                return done(new Error(`Failed to fetch user profile: ${err}`));
            }
            try {
                const json = JSON.parse(body);
                done(null, json);
            }
            catch (e) {
                done(e);
            }
        });
    }
    checkScope(scope, accessToken, cb) {
        this._oauth2.get("https://discord.com/api/v10/users/@me", accessToken, (err, body) => {
            if (err) {
                return cb(new Error(`Failed to fetch user profile: ${err}`));
            }
            try {
                const parsedData = JSON.parse(body);
                if (parsedData.scope.includes(scope)) {
                    cb(null, true);
                }
                else {
                    cb(null, false);
                }
            }
            catch (e) {
                cb(e);
            }
        });
    }
    authorizationParams(options) {
        return { prompt: options.prompt };
    }
}
exports.Strategy = Strategy;
