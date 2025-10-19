export declare const RenderStatus: {
    readonly Complete: "complete";
    readonly Processing: "processing";
    readonly Failed: "failed";
};
export type RenderStatus = (typeof RenderStatus)[keyof typeof RenderStatus];
