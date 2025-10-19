export interface DocxExportOptions {
    includeSpeakers?: boolean;
    includeTimestamps?: boolean;
    segmentOnSilenceLongerThanS?: number;
    maxSegmentDurationS?: number;
    maxSegmentChars?: number;
}
