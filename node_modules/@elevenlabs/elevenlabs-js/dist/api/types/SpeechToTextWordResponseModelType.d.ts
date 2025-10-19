/** The type of the word or sound. 'audio_event' is used for non-word sounds like laughter or footsteps. */
export declare const SpeechToTextWordResponseModelType: {
    readonly Word: "word";
    readonly Spacing: "spacing";
    readonly AudioEvent: "audio_event";
};
export type SpeechToTextWordResponseModelType = (typeof SpeechToTextWordResponseModelType)[keyof typeof SpeechToTextWordResponseModelType];
