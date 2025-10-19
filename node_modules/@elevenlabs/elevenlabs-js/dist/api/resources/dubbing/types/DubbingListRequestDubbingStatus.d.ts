/** What state the dub is currently in. */
export declare const DubbingListRequestDubbingStatus: {
    readonly Dubbing: "dubbing";
    readonly Dubbed: "dubbed";
    readonly Failed: "failed";
};
export type DubbingListRequestDubbingStatus = (typeof DubbingListRequestDubbingStatus)[keyof typeof DubbingListRequestDubbingStatus];
