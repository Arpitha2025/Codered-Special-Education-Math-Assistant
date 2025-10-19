/**
 * @example
 *     {
 *         includeUsages: false
 *     }
 */
export interface WebhooksListRequest {
    /** Whether to include active usages of the webhook, only usable by admins */
    includeUsages?: boolean;
}
