export declare const OutputFormat: {
    /**
     * Output format, mp3 with 22.05kHz sample rate at 32kbps */
    readonly Mp32205032: "mp3_22050_32";
    /**
     * Output format, mp3 with 44.1kHz sample rate at 32kbps */
    readonly Mp34410032: "mp3_44100_32";
    /**
     * Output format, mp3 with 44.1kHz sample rate at 64kbps */
    readonly Mp34410064: "mp3_44100_64";
    /**
     * Output format, mp3 with 44.1kHz sample rate at 96kbps */
    readonly Mp34410096: "mp3_44100_96";
    /**
     * Default output format, mp3 with 44.1kHz sample rate at 128kbps */
    readonly Mp344100128: "mp3_44100_128";
    /**
     * Output format, mp3 with 44.1kHz sample rate at 192kbps. */
    readonly Mp344100192: "mp3_44100_192";
    /**
     * PCM format (S16LE) with 16kHz sample rate. */
    readonly Pcm16000: "pcm_16000";
    /**
     * PCM format (S16LE) with 22.05kHz sample rate. */
    readonly Pcm22050: "pcm_22050";
    /**
     * PCM format (S16LE) with 24kHz sample rate. */
    readonly Pcm24000: "pcm_24000";
    /**
     * PCM format (S16LE) with 44.1kHz sample rate. Requires you to be subscribed to Independent Publisher tier or above. */
    readonly Pcm44100: "pcm_44100";
    /**
     * μ-law format (sometimes written mu-law, often approximated as u-law) with 8kHz sample rate. Note that this format is commonly used for Twilio audio inputs. */
    readonly Ulaw8000: "ulaw_8000";
};
export type OutputFormat = (typeof OutputFormat)[keyof typeof OutputFormat];
