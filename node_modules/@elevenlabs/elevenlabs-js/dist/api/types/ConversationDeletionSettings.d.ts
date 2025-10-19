export interface ConversationDeletionSettings {
    deletionTimeUnixSecs?: number;
    deletedLogsAtTimeUnixSecs?: number;
    deletedAudioAtTimeUnixSecs?: number;
    deletedTranscriptAtTimeUnixSecs?: number;
    deleteTranscriptAndPii?: boolean;
    deleteAudio?: boolean;
}
