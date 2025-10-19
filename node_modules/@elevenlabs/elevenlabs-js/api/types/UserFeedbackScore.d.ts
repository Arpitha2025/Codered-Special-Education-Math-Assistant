export declare const UserFeedbackScore: {
    readonly Like: "like";
    readonly Dislike: "dislike";
};
export type UserFeedbackScore = (typeof UserFeedbackScore)[keyof typeof UserFeedbackScore];
