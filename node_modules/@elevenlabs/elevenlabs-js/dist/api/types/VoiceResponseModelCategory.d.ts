/** The category of the voice. */
export declare const VoiceResponseModelCategory: {
    readonly Generated: "generated";
    readonly Cloned: "cloned";
    readonly Premade: "premade";
    readonly Professional: "professional";
    readonly Famous: "famous";
    readonly HighQuality: "high_quality";
};
export type VoiceResponseModelCategory = (typeof VoiceResponseModelCategory)[keyof typeof VoiceResponseModelCategory];
