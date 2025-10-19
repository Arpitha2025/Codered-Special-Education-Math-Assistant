export interface AudioNativeCreateProjectResponseModel {
    /** The ID of the created Audio Native project. */
    projectId: string;
    /** Whether the project is currently being converted. */
    converting: boolean;
    /** The HTML snippet to embed the Audio Native player. */
    htmlSnippet: string;
}
