export declare const TtsOutputFormat: {
    readonly Pcm8000: "pcm_8000";
    readonly Pcm16000: "pcm_16000";
    readonly Pcm22050: "pcm_22050";
    readonly Pcm24000: "pcm_24000";
    readonly Pcm44100: "pcm_44100";
    readonly Pcm48000: "pcm_48000";
    readonly Ulaw8000: "ulaw_8000";
};
export type TtsOutputFormat = (typeof TtsOutputFormat)[keyof typeof TtsOutputFormat];
