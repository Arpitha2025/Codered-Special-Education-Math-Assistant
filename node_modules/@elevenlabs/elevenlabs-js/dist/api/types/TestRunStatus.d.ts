export declare const TestRunStatus: {
    readonly Pending: "pending";
    readonly Passed: "passed";
    readonly Failed: "failed";
};
export type TestRunStatus = (typeof TestRunStatus)[keyof typeof TestRunStatus];
