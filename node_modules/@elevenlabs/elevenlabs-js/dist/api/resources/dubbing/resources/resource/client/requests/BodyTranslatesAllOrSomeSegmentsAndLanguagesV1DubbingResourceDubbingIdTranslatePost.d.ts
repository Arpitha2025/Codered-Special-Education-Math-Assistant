/**
 * @example
 *     {
 *         segments: ["segments"]
 *     }
 */
export interface BodyTranslatesAllOrSomeSegmentsAndLanguagesV1DubbingResourceDubbingIdTranslatePost {
    /** Translate only this list of segments. */
    segments: string[];
    /** Translate only these languages for each segment. */
    languages?: string[];
}
