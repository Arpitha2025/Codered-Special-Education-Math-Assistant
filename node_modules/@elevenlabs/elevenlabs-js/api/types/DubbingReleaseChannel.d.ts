export declare const DubbingReleaseChannel: {
    readonly Stable: "stable";
    readonly Release: "release";
    readonly Experimental: "experimental";
};
export type DubbingReleaseChannel = (typeof DubbingReleaseChannel)[keyof typeof DubbingReleaseChannel];
