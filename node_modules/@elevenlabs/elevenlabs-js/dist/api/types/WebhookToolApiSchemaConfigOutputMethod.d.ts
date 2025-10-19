/** The HTTP method to use for the webhook */
export declare const WebhookToolApiSchemaConfigOutputMethod: {
    readonly Get: "GET";
    readonly Post: "POST";
    readonly Put: "PUT";
    readonly Patch: "PATCH";
    readonly Delete: "DELETE";
};
export type WebhookToolApiSchemaConfigOutputMethod = (typeof WebhookToolApiSchemaConfigOutputMethod)[keyof typeof WebhookToolApiSchemaConfigOutputMethod];
