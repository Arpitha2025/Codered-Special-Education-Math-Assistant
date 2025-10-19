/** The status of the voice sharing. */
export declare const VoiceSharingState: {
    readonly Enabled: "enabled";
    readonly Disabled: "disabled";
    readonly Copied: "copied";
    readonly CopiedDisabled: "copied_disabled";
};
export type VoiceSharingState = (typeof VoiceSharingState)[keyof typeof VoiceSharingState];
