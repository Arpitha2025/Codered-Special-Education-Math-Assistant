export interface PronunciationDictionaryPhonemeRuleRequestModel {
    /** The string to replace. Must be a non-empty string. */
    stringToReplace: string;
    /** The phoneme rule. */
    phoneme: string;
    /** The alphabet to use with the phoneme rule. */
    alphabet: string;
}
