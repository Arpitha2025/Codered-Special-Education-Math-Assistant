/** The quality preset level of the project. */
export declare const ProjectExtendedResponseModelQualityPreset: {
    readonly Standard: "standard";
    readonly High: "high";
    readonly Highest: "highest";
    readonly Ultra: "ultra";
    readonly UltraLossless: "ultra_lossless";
};
export type ProjectExtendedResponseModelQualityPreset = (typeof ProjectExtendedResponseModelQualityPreset)[keyof typeof ProjectExtendedResponseModelQualityPreset];
