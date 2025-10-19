export declare const WebhookUsageType: {
    readonly ConvAiAgentSettings: "ConvAI Agent Settings";
    readonly ConvAiSettings: "ConvAI Settings";
    readonly VoiceLibraryRemovalNotices: "Voice Library Removal Notices";
    readonly SpeechToText: "Speech to Text";
};
export type WebhookUsageType = (typeof WebhookUsageType)[keyof typeof WebhookUsageType];
