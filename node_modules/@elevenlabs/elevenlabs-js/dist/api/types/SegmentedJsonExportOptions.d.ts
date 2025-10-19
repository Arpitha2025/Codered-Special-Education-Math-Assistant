export interface SegmentedJsonExportOptions {
    includeSpeakers?: boolean;
    includeTimestamps?: boolean;
    segmentOnSilenceLongerThanS?: number;
    maxSegmentDurationS?: number;
    maxSegmentChars?: number;
}
