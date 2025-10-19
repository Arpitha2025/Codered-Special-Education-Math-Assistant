/** The tier to change to. */
export declare const PendingSubscriptionSwitchResponseModelNextTier: {
    readonly Free: "free";
    readonly Starter: "starter";
    readonly Creator: "creator";
    readonly Pro: "pro";
    readonly GrowingBusiness: "growing_business";
    readonly Scale20240810: "scale_2024_08_10";
    readonly GrantTier120250723: "grant_tier_1_2025_07_23";
    readonly GrantTier220250723: "grant_tier_2_2025_07_23";
    readonly Trial: "trial";
    readonly Enterprise: "enterprise";
};
export type PendingSubscriptionSwitchResponseModelNextTier = (typeof PendingSubscriptionSwitchResponseModelNextTier)[keyof typeof PendingSubscriptionSwitchResponseModelNextTier];
