export interface SingleTestRunRequestModel {
    /** ID of the test to run */
    testId: string;
    /** ID of the workflow node to run the test on. If not provided, the test will be run on the agent's default workflow node. */
    workflowNodeId?: string;
}
