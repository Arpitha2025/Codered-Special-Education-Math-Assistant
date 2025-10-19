/**
 * @example
 *     {
 *         text: "text"
 *     }
 */
export interface BodyCreateTextDocumentV1ConvaiKnowledgeBaseTextPost {
    /** Text content to be added to the knowledge base. */
    text: string;
    /** A custom, human-readable name for the document. */
    name?: string;
}
