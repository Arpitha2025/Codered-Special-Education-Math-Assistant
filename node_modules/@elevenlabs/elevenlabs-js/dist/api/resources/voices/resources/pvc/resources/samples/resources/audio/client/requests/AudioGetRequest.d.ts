/**
 * @example
 *     {
 *         removeBackgroundNoise: true
 *     }
 */
export interface AudioGetRequest {
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    removeBackgroundNoise?: boolean;
}
