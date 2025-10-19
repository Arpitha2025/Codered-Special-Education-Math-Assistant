/**
 * @example
 *     {
 *         startTime: 1.1,
 *         endTime: 1.1
 *     }
 */
export interface SegmentCreatePayload {
    startTime: number;
    endTime: number;
    text?: string;
    translations?: Record<string, string | undefined>;
}
