/** The mode in which to run this Dubbing job. Defaults to automatic, use manual if specifically providing a CSV transcript to use. */
export declare const DubbingCreateRequestMode: {
    readonly Automatic: "automatic";
    readonly Manual: "manual";
};
export type DubbingCreateRequestMode = (typeof DubbingCreateRequestMode)[keyof typeof DubbingCreateRequestMode];
