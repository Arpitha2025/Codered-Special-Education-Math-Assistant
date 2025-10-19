export declare const SafetyRule: {
    readonly SexualMinors: "sexual_minors";
    readonly ForgetModeration: "forget_moderation";
    readonly Extremism: "extremism";
    readonly ScamFraud: "scam_fraud";
    readonly Political: "political";
    readonly SelfHarm: "self_harm";
    readonly IllegalDistributionMedical: "illegal_distribution_medical";
    readonly SexualAdults: "sexual_adults";
    readonly Unknown: "unknown";
};
export type SafetyRule = (typeof SafetyRule)[keyof typeof SafetyRule];
