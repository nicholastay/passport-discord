import type { StrategyOptionsWithRequest, VerifyFunctionWithRequest } from "passport-oauth2";
import OAuth2Strategy from "passport-oauth2";
/**
 * Strategy for OAuth2 authentication, particularly configured for Discord.
 *
 * @param {StrategyOptionsWithRequest} options - Strategy options with request.
 * @param {VerifyFunctionWithRequest} verify - Verification function with request.
 * @returns An instance of OAuth2Strategy.
 */
declare const Strategy: (options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest) => OAuth2Strategy;
export default Strategy;
