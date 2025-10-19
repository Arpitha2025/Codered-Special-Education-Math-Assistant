export declare const BatchCallStatus: {
    readonly Pending: "pending";
    readonly InProgress: "in_progress";
    readonly Completed: "completed";
    readonly Failed: "failed";
    readonly Cancelled: "cancelled";
};
export type BatchCallStatus = (typeof BatchCallStatus)[keyof typeof BatchCallStatus];
