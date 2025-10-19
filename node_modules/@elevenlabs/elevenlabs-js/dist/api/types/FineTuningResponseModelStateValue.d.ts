export declare const FineTuningResponseModelStateValue: {
    readonly NotStarted: "not_started";
    readonly Queued: "queued";
    readonly FineTuning: "fine_tuning";
    readonly FineTuned: "fine_tuned";
    readonly Failed: "failed";
    readonly Delayed: "delayed";
};
export type FineTuningResponseModelStateValue = (typeof FineTuningResponseModelStateValue)[keyof typeof FineTuningResponseModelStateValue];
