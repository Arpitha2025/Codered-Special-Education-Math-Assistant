export interface PendingCancellationResponseModel {
    kind?: "cancellation";
    /** The timestamp of the cancellation. */
    timestampSeconds: number;
}
