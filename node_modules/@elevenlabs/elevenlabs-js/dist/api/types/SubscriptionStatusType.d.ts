export declare const SubscriptionStatusType: {
    readonly Trialing: "trialing";
    readonly Active: "active";
    readonly Incomplete: "incomplete";
    readonly PastDue: "past_due";
    readonly Free: "free";
    readonly FreeDisabled: "free_disabled";
};
export type SubscriptionStatusType = (typeof SubscriptionStatusType)[keyof typeof SubscriptionStatusType];
