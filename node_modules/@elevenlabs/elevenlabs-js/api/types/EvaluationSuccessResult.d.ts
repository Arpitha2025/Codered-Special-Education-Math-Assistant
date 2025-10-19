export declare const EvaluationSuccessResult: {
    readonly Success: "success";
    readonly Failure: "failure";
    readonly Unknown: "unknown";
};
export type EvaluationSuccessResult = (typeof EvaluationSuccessResult)[keyof typeof EvaluationSuccessResult];
