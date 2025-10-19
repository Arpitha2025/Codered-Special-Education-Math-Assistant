/** Filters who created the resources being listed, whether it was the user running the request or someone else that shared the resource with them. */
export declare const DubbingListRequestFilterByCreator: {
    readonly Personal: "personal";
    readonly Others: "others";
    readonly All: "all";
};
export type DubbingListRequestFilterByCreator = (typeof DubbingListRequestFilterByCreator)[keyof typeof DubbingListRequestFilterByCreator];
