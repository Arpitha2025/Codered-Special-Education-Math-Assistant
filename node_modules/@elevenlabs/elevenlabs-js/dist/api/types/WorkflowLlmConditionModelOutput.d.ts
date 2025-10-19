export interface WorkflowLlmConditionModelOutput {
    /** Optional human-readable label for the condition used throughout the UI. */
    label?: string;
    /** Condition to evaluate */
    condition: string;
}
