/**
 * Tracks a dynamic variable update that occurred during tool execution.
 */
export interface DynamicVariableUpdateCommonModel {
    variableName: string;
    oldValue?: string;
    newValue: string;
    updatedAt: number;
    toolName: string;
    toolRequestId: string;
}
