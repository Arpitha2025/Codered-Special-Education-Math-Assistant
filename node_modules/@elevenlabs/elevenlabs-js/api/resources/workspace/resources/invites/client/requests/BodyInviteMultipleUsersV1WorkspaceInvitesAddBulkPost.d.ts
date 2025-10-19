/**
 * @example
 *     {
 *         emails: ["emails"]
 *     }
 */
export interface BodyInviteMultipleUsersV1WorkspaceInvitesAddBulkPost {
    /** The email of the customer */
    emails: string[];
    /** The group ids of the user */
    groupIds?: string[];
}
