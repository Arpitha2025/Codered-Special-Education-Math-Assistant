export declare const ConversationTokenPurpose: {
    readonly SignedUrl: "signed_url";
    readonly ShareableLink: "shareable_link";
};
export type ConversationTokenPurpose = (typeof ConversationTokenPurpose)[keyof typeof ConversationTokenPurpose];
