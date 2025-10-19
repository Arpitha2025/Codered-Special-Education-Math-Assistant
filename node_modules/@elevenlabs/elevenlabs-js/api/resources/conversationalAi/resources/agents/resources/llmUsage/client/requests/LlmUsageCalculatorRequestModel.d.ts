/**
 * @example
 *     {}
 */
export interface LlmUsageCalculatorRequestModel {
    /** Length of the prompt in characters. */
    promptLength?: number;
    /** Pages of content in pdf documents OR urls in agent's Knowledge Base. */
    numberOfPages?: number;
    /** Whether RAG is enabled. */
    ragEnabled?: boolean;
}
