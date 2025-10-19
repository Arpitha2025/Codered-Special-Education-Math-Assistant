export declare const VoiceResponseModelSafetyControl: {
    readonly None: "NONE";
    readonly Ban: "BAN";
    readonly Captcha: "CAPTCHA";
    readonly EnterpriseBan: "ENTERPRISE_BAN";
    readonly EnterpriseCaptcha: "ENTERPRISE_CAPTCHA";
};
export type VoiceResponseModelSafetyControl = (typeof VoiceResponseModelSafetyControl)[keyof typeof VoiceResponseModelSafetyControl];
