export interface PromptAgentApiModelOverrideConfig {
    /** Whether to allow overriding the prompt field. */
    prompt?: boolean;
    /** Whether to allow overriding the llm field. */
    llm?: boolean;
    /** Whether to allow overriding the native_mcp_server_ids field. */
    nativeMcpServerIds?: boolean;
}
