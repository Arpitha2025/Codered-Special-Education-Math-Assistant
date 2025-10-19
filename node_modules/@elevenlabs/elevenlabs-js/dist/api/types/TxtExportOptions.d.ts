export interface TxtExportOptions {
    maxCharactersPerLine?: number;
    includeSpeakers?: boolean;
    includeTimestamps?: boolean;
    segmentOnSilenceLongerThanS?: number;
    maxSegmentDurationS?: number;
    maxSegmentChars?: number;
}
