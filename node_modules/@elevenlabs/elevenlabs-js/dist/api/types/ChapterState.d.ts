/** The state of the chapter. */
export declare const ChapterState: {
    readonly Default: "default";
    readonly Converting: "converting";
};
export type ChapterState = (typeof ChapterState)[keyof typeof ChapterState];
