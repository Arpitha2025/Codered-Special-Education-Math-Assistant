/** The status of the speaker separation. */
export declare const SpeakerSeparationResponseModelStatus: {
    readonly NotStarted: "not_started";
    readonly Pending: "pending";
    readonly Completed: "completed";
    readonly Failed: "failed";
};
export type SpeakerSeparationResponseModelStatus = (typeof SpeakerSeparationResponseModelStatus)[keyof typeof SpeakerSeparationResponseModelStatus];
