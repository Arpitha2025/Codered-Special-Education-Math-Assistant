/** The type of the project creation action. */
export declare const ProjectCreationMetaResponseModelType: {
    readonly Blank: "blank";
    readonly GeneratePodcast: "generate_podcast";
    readonly AutoAssignVoices: "auto_assign_voices";
};
export type ProjectCreationMetaResponseModelType = (typeof ProjectCreationMetaResponseModelType)[keyof typeof ProjectCreationMetaResponseModelType];
