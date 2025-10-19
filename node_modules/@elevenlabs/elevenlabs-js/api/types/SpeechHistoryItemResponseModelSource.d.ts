export declare const SpeechHistoryItemResponseModelSource: {
    readonly Tts: "TTS";
    readonly Sts: "STS";
    readonly Projects: "Projects";
    readonly Pd: "PD";
    readonly An: "AN";
    readonly Dubbing: "Dubbing";
    readonly PlayApi: "PlayAPI";
    readonly ConvAi: "ConvAI";
    readonly VoiceGeneration: "VoiceGeneration";
};
export type SpeechHistoryItemResponseModelSource = (typeof SpeechHistoryItemResponseModelSource)[keyof typeof SpeechHistoryItemResponseModelSource];
