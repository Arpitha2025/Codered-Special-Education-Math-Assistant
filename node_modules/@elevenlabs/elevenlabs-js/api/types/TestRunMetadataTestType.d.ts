export declare const TestRunMetadataTestType: {
    readonly Llm: "llm";
    readonly ToolCall: "tool_call";
};
export type TestRunMetadataTestType = (typeof TestRunMetadataTestType)[keyof typeof TestRunMetadataTestType];
