export declare const InvoiceResponseModelPaymentIntentStatus: {
    readonly Canceled: "canceled";
    readonly Processing: "processing";
    readonly RequiresAction: "requires_action";
    readonly RequiresCapture: "requires_capture";
    readonly RequiresConfirmation: "requires_confirmation";
    readonly RequiresPaymentMethod: "requires_payment_method";
    readonly Succeeded: "succeeded";
};
export type InvoiceResponseModelPaymentIntentStatus = (typeof InvoiceResponseModelPaymentIntentStatus)[keyof typeof InvoiceResponseModelPaymentIntentStatus];
