import OAuth2Strategy, { StrategyOptionsWithRequest, VerifyFunctionWithRequest } from "passport-oauth2";
export declare class Strategy extends OAuth2Strategy {
    /**
     * Creates an instance of Strategy.
     *
     * @param {StrategyOptionsWithRequest} options - Strategy options with request.
     * @param {VerifyFunctionWithRequest} verify - Verification function with request.
     */
    constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
    userProfile(accessToken: string, done: (err?: (Error | null), profile?: any) => void): void;
    checkScope(scope: string, accessToken: string, cb: (err?: (Error | null), value?: any) => void): void;
    authorizationParams(options: any): object;
}
