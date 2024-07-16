import { RapidapiSMVDClient, getLinkWithMinQuality } from "@/services/VideoUploader/RapidapiSMVDClient";
import axios from "axios";
import { useState } from "react";

const RAPIDAPI_KEY = "afb444121cmsh78d78fdad9a101dp1fa595jsn6e7d6e7786ff";

const smvdClient = new RapidapiSMVDClient({
    rapidapiKey: RAPIDAPI_KEY
});

export interface RapidApiHookResult {
    uploadVideo: (url: string) => Promise<void>,
    video: Blob | null,
    error: Blob | null
}

export default function useRapidApi() {
    const [video, setVideo] = useState<Blob | null>(null);
    const [error, setError] = useState<Error | null>(null);

    async function uploadVideo(url: string): Promise<void> {
        try {
            const extractedVideo = await smvdClient.extractVideo(url);
            const videoItem = getLinkWithMinQuality(extractedVideo);
            await axios.get(videoItem.link, { responseType: "blob" })
                .then(response => {
                    setVideo(response.data);
                    setError(null);
                });
        }
        catch (e) {
            console.error("Error while getting video using Social Media Video Downloader by RapidAPI.", e);
            setError(e as any as Error);
            setVideo(null);
        }
    }

    return { uploadVideo, video, error };
}
