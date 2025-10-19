export interface SipTrunkCredentialsRequestModel {
    /** SIP trunk username */
    username: string;
    /** SIP trunk password - if not specified, then remain unchanged */
    password?: string;
}
