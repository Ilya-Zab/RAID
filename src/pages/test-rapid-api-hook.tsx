import useRapidApi from "@/hooks/useRapidApi";
import { downloadFile } from "@/utils/downloadFile";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function TestRapidApi()
{
    const { uploadVideo, video, error } = useRapidApi();
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        if (video)
            downloadFile(video, "rapidapi-video.mp4");
        if (error)
            setResult(error)
    }, [video, error]);
    
    async function handleSubmit(e: FormEvent)
    {
        e.preventDefault();

        uploadVideo(url);
    }

    return (
        <div>
            <h1>Get video via RapidAPI</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="videoUrlEditor">Enter URL-address of your video</label><br />
                <input
                    id="videoUrlEditor"
                    type="url"
                    placeholder="Enter URL-address"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <br />
                <button
                    type="submit"
                >Send</button>
            </form>

            <div>
                <h2>Result</h2>
                <pre>
                    {JSON.stringify(result)}
                </pre>
            </div>
        </div>
    );
}

