export declare const WidgetPlacement: {
    readonly TopLeft: "top-left";
    readonly Top: "top";
    readonly TopRight: "top-right";
    readonly BottomLeft: "bottom-left";
    readonly Bottom: "bottom";
    readonly BottomRight: "bottom-right";
};
export type WidgetPlacement = (typeof WidgetPlacement)[keyof typeof WidgetPlacement];
