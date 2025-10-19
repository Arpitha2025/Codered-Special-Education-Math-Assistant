export interface TransferToNumberResultTwilioSuccessModel {
    status?: "success";
    transferNumber: string;
    reason?: string;
    clientMessage?: string;
    agentMessage: string;
    conferenceName: string;
    note?: string;
}
