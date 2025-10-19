export declare const IntegrationType: {
    readonly McpServer: "mcp_server";
    readonly McpIntegration: "mcp_integration";
};
export type IntegrationType = (typeof IntegrationType)[keyof typeof IntegrationType];
