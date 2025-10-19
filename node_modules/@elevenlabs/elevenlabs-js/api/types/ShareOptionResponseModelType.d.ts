/** The type of the principal: user, group, or service account (under 'key'). */
export declare const ShareOptionResponseModelType: {
    readonly User: "user";
    readonly Group: "group";
    readonly Key: "key";
};
export type ShareOptionResponseModelType = (typeof ShareOptionResponseModelType)[keyof typeof ShareOptionResponseModelType];
