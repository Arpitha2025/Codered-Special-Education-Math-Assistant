/**
 * User-specific secret model that are not shared with other users in a workspace.
 */
export interface ConvAiUserSecretDbModel {
    id: string;
    name: string;
    encryptedValue: string;
    nonce: string;
}
