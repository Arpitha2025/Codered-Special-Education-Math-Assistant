export interface WorkflowResultConditionModelInput {
    /** Optional human-readable label for the condition used throughout the UI. */
    label?: string;
    /** Whether all tools in the previously executed tool node were executed successfully. */
    successful: boolean;
}
