/**
 * @example
 *     {
 *         testIds: ["test_id_1", "test_id_2"]
 *     }
 */
export interface ListTestsByIdsRequestModel {
    /** List of test IDs to fetch. No duplicates allowed. */
    testIds: string[];
}
