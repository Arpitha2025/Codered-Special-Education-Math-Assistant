export interface PdfExportOptions {
    includeSpeakers?: boolean;
    includeTimestamps?: boolean;
    segmentOnSilenceLongerThanS?: number;
    maxSegmentDurationS?: number;
    maxSegmentChars?: number;
}
