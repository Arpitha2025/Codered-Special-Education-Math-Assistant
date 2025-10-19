export declare const WebhookEventType: {
    readonly Transcript: "transcript";
    readonly Audio: "audio";
    readonly CallInitiationFailure: "call_initiation_failure";
};
export type WebhookEventType = (typeof WebhookEventType)[keyof typeof WebhookEventType];
