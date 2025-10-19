/** The access level of the project. */
export declare const ProjectExtendedResponseModelAccessLevel: {
    readonly Admin: "admin";
    readonly Editor: "editor";
    readonly Commenter: "commenter";
    readonly Viewer: "viewer";
};
export type ProjectExtendedResponseModelAccessLevel = (typeof ProjectExtendedResponseModelAccessLevel)[keyof typeof ProjectExtendedResponseModelAccessLevel];
