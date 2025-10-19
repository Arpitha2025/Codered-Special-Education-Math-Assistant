/**
 * Structured rationale for test condition results containing individual failure/success reasons.
 */
export interface TestConditionRationaleCommonModel {
    /** List of individual parameter evaluation messages or reasons */
    messages?: string[];
    /** High-level summary of the evaluation result */
    summary?: string;
}
