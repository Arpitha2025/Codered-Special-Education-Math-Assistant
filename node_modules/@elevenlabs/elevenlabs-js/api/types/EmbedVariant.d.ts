export declare const EmbedVariant: {
    readonly Tiny: "tiny";
    readonly Compact: "compact";
    readonly Full: "full";
    readonly Expandable: "expandable";
};
export type EmbedVariant = (typeof EmbedVariant)[keyof typeof EmbedVariant];
