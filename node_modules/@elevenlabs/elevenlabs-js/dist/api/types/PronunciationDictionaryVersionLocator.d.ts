export interface PronunciationDictionaryVersionLocator {
    /** The ID of the pronunciation dictionary. */
    pronunciationDictionaryId: string;
    /** The ID of the version of the pronunciation dictionary. If not provided, the latest version will be used. */
    versionId?: string;
}
