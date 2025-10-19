export declare const WidgetExpandable: {
    readonly Never: "never";
    readonly Mobile: "mobile";
    readonly Desktop: "desktop";
    readonly Always: "always";
};
export type WidgetExpandable = (typeof WidgetExpandable)[keyof typeof WidgetExpandable];
