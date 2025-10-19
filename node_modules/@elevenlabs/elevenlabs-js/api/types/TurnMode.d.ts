export declare const TurnMode: {
    readonly Silence: "silence";
    readonly Turn: "turn";
};
export type TurnMode = (typeof TurnMode)[keyof typeof TurnMode];
