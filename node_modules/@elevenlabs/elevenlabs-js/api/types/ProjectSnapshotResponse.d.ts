export interface ProjectSnapshotResponse {
    /** The ID of the project snapshot. */
    projectSnapshotId: string;
    /** The ID of the project. */
    projectId: string;
    /** The creation date of the project snapshot. */
    createdAtUnix: number;
    /** The name of the project snapshot. */
    name: string;
    /** (Deprecated) */
    audioUpload?: Record<string, unknown>;
    /** (Deprecated) */
    zipUpload?: Record<string, unknown>;
}
