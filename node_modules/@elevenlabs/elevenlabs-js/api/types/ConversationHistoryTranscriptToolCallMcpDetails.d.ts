export interface ConversationHistoryTranscriptToolCallMcpDetails {
    mcpServerId: string;
    mcpServerName: string;
    integrationType: string;
    parameters?: Record<string, string>;
    approvalPolicy: string;
    requiresApproval?: boolean;
    mcpToolName?: string;
    mcpToolDescription?: string;
}
