/** The granularity of the timestamps in the transcription. 'word' provides word-level timestamps and 'character' provides character-level timestamps per word. */
export declare const SpeechToTextConvertRequestTimestampsGranularity: {
    readonly None: "none";
    readonly Word: "word";
    readonly Character: "character";
};
export type SpeechToTextConvertRequestTimestampsGranularity = (typeof SpeechToTextConvertRequestTimestampsGranularity)[keyof typeof SpeechToTextConvertRequestTimestampsGranularity];
