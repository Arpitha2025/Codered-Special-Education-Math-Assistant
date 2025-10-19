export declare const TtsModelFamily: {
    readonly Turbo: "turbo";
    readonly Flash: "flash";
    readonly Multilingual: "multilingual";
};
export type TtsModelFamily = (typeof TtsModelFamily)[keyof typeof TtsModelFamily];
