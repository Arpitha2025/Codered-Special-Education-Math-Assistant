/** The state of the project. */
export declare const ProjectState: {
    readonly Creating: "creating";
    readonly Default: "default";
    readonly Converting: "converting";
    readonly InQueue: "in_queue";
};
export type ProjectState = (typeof ProjectState)[keyof typeof ProjectState];
