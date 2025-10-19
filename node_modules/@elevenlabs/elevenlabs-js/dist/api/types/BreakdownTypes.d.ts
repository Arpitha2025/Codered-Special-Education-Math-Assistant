/** How to break down the information. Cannot be "user" or "api_key" if include_workspace_metrics is False. */
export declare const BreakdownTypes: {
    readonly None: "none";
    readonly Voice: "voice";
    readonly VoiceMultiplier: "voice_multiplier";
    readonly User: "user";
    readonly Groups: "groups";
    readonly ApiKeys: "api_keys";
    readonly AllApiKeys: "all_api_keys";
    readonly ProductType: "product_type";
    readonly Model: "model";
    readonly Resource: "resource";
    readonly RequestQueue: "request_queue";
    readonly Region: "region";
    readonly SubresourceId: "subresource_id";
    readonly ReportingWorkspaceId: "reporting_workspace_id";
    readonly HasApiKey: "has_api_key";
    readonly RequestSource: "request_source";
};
export type BreakdownTypes = (typeof BreakdownTypes)[keyof typeof BreakdownTypes];
