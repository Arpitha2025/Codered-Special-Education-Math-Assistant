export interface TwilioOutboundCallResponse {
    success: boolean;
    message: string;
    conversationId?: string;
    callSid?: string;
}
