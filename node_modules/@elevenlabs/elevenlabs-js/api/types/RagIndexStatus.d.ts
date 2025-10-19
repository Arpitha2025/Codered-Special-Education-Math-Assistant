export declare const RagIndexStatus: {
    readonly Created: "created";
    readonly Processing: "processing";
    readonly Failed: "failed";
    readonly Succeeded: "succeeded";
    readonly RagLimitExceeded: "rag_limit_exceeded";
    readonly DocumentTooSmall: "document_too_small";
};
export type RagIndexStatus = (typeof RagIndexStatus)[keyof typeof RagIndexStatus];
