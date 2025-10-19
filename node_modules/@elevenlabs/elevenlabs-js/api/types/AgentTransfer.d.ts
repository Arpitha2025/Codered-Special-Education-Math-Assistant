export interface AgentTransfer {
    agentId: string;
    condition: string;
    delayMs?: number;
    transferMessage?: string;
    enableTransferredAgentFirstMessage?: boolean;
}
