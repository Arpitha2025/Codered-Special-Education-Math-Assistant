/**
 * @example
 *     {
 *         showLegacy: true
 *     }
 */
export interface VoicesGetAllRequest {
    /** If set to true, legacy premade voices will be included in responses from /v1/voices */
    showLegacy?: boolean;
}
