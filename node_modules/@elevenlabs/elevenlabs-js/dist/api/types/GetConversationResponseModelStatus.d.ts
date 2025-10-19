export declare const GetConversationResponseModelStatus: {
    readonly Initiated: "initiated";
    readonly InProgress: "in-progress";
    readonly Processing: "processing";
    readonly Done: "done";
    readonly Failed: "failed";
};
export type GetConversationResponseModelStatus = (typeof GetConversationResponseModelStatus)[keyof typeof GetConversationResponseModelStatus];
