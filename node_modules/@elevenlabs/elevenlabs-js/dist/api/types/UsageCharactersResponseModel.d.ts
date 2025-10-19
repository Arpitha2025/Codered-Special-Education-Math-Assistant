export interface UsageCharactersResponseModel {
    /** The time axis with unix timestamps for each day. */
    time: number[];
    /** The usage of each breakdown type along the time axis. */
    usage: Record<string, number[]>;
}
