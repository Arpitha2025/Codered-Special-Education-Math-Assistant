/**
 * Payload to signal closing the entire WebSocket connection.
 */
export interface CloseSocket {
    /** If true, closes all contexts and closes the entire WebSocket connection. Any context that was previously set to flush will wait to flush before closing. */
    closeSocket?: boolean;
}
