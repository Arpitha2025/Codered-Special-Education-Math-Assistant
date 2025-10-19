export declare const TtsConversationalModel: {
    readonly ElevenTurboV2: "eleven_turbo_v2";
    readonly ElevenTurboV25: "eleven_turbo_v2_5";
    readonly ElevenFlashV2: "eleven_flash_v2";
    readonly ElevenFlashV25: "eleven_flash_v2_5";
    readonly ElevenMultilingualV2: "eleven_multilingual_v2";
};
export type TtsConversationalModel = (typeof TtsConversationalModel)[keyof typeof TtsConversationalModel];
