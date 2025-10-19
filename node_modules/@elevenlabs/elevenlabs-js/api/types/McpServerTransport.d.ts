/** Supported MCP server transport types. */
export declare const McpServerTransport: {
    readonly Sse: "SSE";
    readonly StreamableHttp: "STREAMABLE_HTTP";
};
export type McpServerTransport = (typeof McpServerTransport)[keyof typeof McpServerTransport];
