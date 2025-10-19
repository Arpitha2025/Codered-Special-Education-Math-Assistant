export interface TtsConversationalConfigOverride {
    /** The voice ID to use for TTS */
    voiceId?: string;
    /** The stability of generated speech */
    stability?: number;
    /** The speed of generated speech */
    speed?: number;
    /** The similarity boost for generated speech */
    similarityBoost?: number;
}
