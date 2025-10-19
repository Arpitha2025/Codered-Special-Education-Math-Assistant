/** Defines the tool-level approval policy. */
export declare const McpToolApprovalPolicy: {
    readonly AutoApproved: "auto_approved";
    readonly RequiresApproval: "requires_approval";
};
export type McpToolApprovalPolicy = (typeof McpToolApprovalPolicy)[keyof typeof McpToolApprovalPolicy];
