/**
 * @example
 *     {
 *         agentId: "21m00Tcm4TlvDq8ikWAM",
 *         participantName: "participant_name"
 *     }
 */
export interface ConversationsGetWebrtcTokenRequest {
    /** The id of the agent you're taking the action on. */
    agentId: string;
    /** Optional custom participant name. If not provided, user ID will be used */
    participantName?: string;
}
