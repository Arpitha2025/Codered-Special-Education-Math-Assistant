export interface HtmlExportOptions {
    includeSpeakers?: boolean;
    includeTimestamps?: boolean;
    segmentOnSilenceLongerThanS?: number;
    maxSegmentDurationS?: number;
    maxSegmentChars?: number;
}
