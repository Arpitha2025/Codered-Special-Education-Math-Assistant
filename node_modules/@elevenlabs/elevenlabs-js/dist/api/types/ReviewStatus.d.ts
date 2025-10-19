/** The review status of the voice. */
export declare const ReviewStatus: {
    readonly NotRequested: "not_requested";
    readonly Pending: "pending";
    readonly Declined: "declined";
    readonly Allowed: "allowed";
    readonly AllowedWithChanges: "allowed_with_changes";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
