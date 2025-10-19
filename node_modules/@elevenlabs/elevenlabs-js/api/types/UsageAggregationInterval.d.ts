/** The time interval over which to aggregate the usage data. */
export declare const UsageAggregationInterval: {
    readonly Hour: "hour";
    readonly Day: "day";
    readonly Week: "week";
    readonly Month: "month";
    readonly Cumulative: "cumulative";
};
export type UsageAggregationInterval = (typeof UsageAggregationInterval)[keyof typeof UsageAggregationInterval];
