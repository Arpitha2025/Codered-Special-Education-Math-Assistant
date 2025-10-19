/**
 * Represents a single voice part of a multi-voice message.
 */
export interface ConversationHistoryMultivoiceMessagePartModel {
    text: string;
    voiceLabel?: string;
    timeInCallSecs?: number;
}
