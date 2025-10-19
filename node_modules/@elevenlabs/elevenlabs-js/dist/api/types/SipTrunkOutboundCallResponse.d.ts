export interface SipTrunkOutboundCallResponse {
    success: boolean;
    message: string;
    conversationId?: string;
    sipCallId?: string;
}
