/** The HTTP method to use for the webhook */
export declare const WebhookToolApiSchemaConfigInputMethod: {
    readonly Get: "GET";
    readonly Post: "POST";
    readonly Put: "PUT";
    readonly Patch: "PATCH";
    readonly Delete: "DELETE";
};
export type WebhookToolApiSchemaConfigInputMethod = (typeof WebhookToolApiSchemaConfigInputMethod)[keyof typeof WebhookToolApiSchemaConfigInputMethod];
