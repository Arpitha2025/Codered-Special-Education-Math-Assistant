/** Defines the MCP server-level approval policy for tool execution. */
export declare const McpApprovalPolicy: {
    readonly AutoApproveAll: "auto_approve_all";
    readonly RequireApprovalAll: "require_approval_all";
    readonly RequireApprovalPerTool: "require_approval_per_tool";
};
export type McpApprovalPolicy = (typeof McpApprovalPolicy)[keyof typeof McpApprovalPolicy];
