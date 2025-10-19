export declare const AuthorizationMethod: {
    readonly Invalid: "invalid";
    readonly Public: "public";
    readonly AuthorizationHeader: "authorization_header";
    readonly SignedUrl: "signed_url";
    readonly ShareableLink: "shareable_link";
    readonly LivekitToken: "livekit_token";
    readonly LivekitTokenWebsite: "livekit_token_website";
    readonly GenesysApiKey: "genesys_api_key";
};
export type AuthorizationMethod = (typeof AuthorizationMethod)[keyof typeof AuthorizationMethod];
