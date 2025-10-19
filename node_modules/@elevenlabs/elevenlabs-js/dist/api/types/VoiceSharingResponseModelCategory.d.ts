/** The category of the voice. */
export declare const VoiceSharingResponseModelCategory: {
    readonly Generated: "generated";
    readonly Cloned: "cloned";
    readonly Premade: "premade";
    readonly Professional: "professional";
    readonly Famous: "famous";
    readonly HighQuality: "high_quality";
};
export type VoiceSharingResponseModelCategory = (typeof VoiceSharingResponseModelCategory)[keyof typeof VoiceSharingResponseModelCategory];
