export declare const TelephonyProvider: {
    readonly Twilio: "twilio";
    readonly SipTrunk: "sip_trunk";
};
export type TelephonyProvider = (typeof TelephonyProvider)[keyof typeof TelephonyProvider];
