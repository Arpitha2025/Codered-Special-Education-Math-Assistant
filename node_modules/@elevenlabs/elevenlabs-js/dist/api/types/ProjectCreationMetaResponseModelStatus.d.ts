/** The status of the project creation action. */
export declare const ProjectCreationMetaResponseModelStatus: {
    readonly Pending: "pending";
    readonly Creating: "creating";
    readonly Finished: "finished";
    readonly Failed: "failed";
};
export type ProjectCreationMetaResponseModelStatus = (typeof ProjectCreationMetaResponseModelStatus)[keyof typeof ProjectCreationMetaResponseModelStatus];
