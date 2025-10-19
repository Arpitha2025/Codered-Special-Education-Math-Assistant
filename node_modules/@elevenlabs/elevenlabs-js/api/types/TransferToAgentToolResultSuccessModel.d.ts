export interface TransferToAgentToolResultSuccessModel {
    status?: "success";
    fromAgent: string;
    toAgent: string;
    condition: string;
    delayMs?: number;
    transferMessage?: string;
    enableTransferredAgentFirstMessage?: boolean;
}
