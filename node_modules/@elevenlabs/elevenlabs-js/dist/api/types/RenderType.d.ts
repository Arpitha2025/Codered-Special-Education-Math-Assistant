export declare const RenderType: {
    readonly Mp4: "mp4";
    readonly Aac: "aac";
    readonly Mp3: "mp3";
    readonly Wav: "wav";
    readonly Aaf: "aaf";
    readonly TracksZip: "tracks_zip";
    readonly ClipsZip: "clips_zip";
};
export type RenderType = (typeof RenderType)[keyof typeof RenderType];
