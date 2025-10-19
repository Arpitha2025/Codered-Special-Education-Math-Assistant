export interface SpeakerAudioResponseModel {
    /** The base64 encoded audio. */
    audioBase64: string;
    /** The media type of the audio. */
    mediaType: string;
    /** The duration of the audio in seconds. */
    durationSecs: number;
}
