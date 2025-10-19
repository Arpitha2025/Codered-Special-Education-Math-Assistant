export interface HistoryAlignmentResponseModel {
    /** The characters in the alignment. */
    characters: string[];
    /** The start times of the characters in seconds. */
    characterStartTimesSeconds: number[];
    /** The end times of the characters in seconds. */
    characterEndTimesSeconds: number[];
}
