/** The role of the user making the request */
export declare const ResourceAccessInfoRole: {
    readonly Admin: "admin";
    readonly Editor: "editor";
    readonly Commenter: "commenter";
    readonly Viewer: "viewer";
};
export type ResourceAccessInfoRole = (typeof ResourceAccessInfoRole)[keyof typeof ResourceAccessInfoRole];
