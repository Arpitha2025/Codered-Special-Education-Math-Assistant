/** The access level of the project. */
export declare const ProjectResponseModelAccessLevel: {
    readonly Admin: "admin";
    readonly Editor: "editor";
    readonly Commenter: "commenter";
    readonly Viewer: "viewer";
};
export type ProjectResponseModelAccessLevel = (typeof ProjectResponseModelAccessLevel)[keyof typeof ProjectResponseModelAccessLevel];
