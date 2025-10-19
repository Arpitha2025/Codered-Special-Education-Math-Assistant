export declare const WebhookAuthMethodType: {
    readonly Hmac: "hmac";
    readonly Oauth2: "oauth2";
    readonly Mtls: "mtls";
};
export type WebhookAuthMethodType = (typeof WebhookAuthMethodType)[keyof typeof WebhookAuthMethodType];
