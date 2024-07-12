import { downloadFile } from "@/utils/downloadFile";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

export default function TestRapidApi() {
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState<any>(null);
    const isRequestedRef = useRef<boolean>(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

<<<<<<< HEAD
        axios("/api/rapid", {
            params: {
                url
            }
        })
            .then(response => setResult(response.data))
            .catch(err => setResult(err.response.data));
=======
        const blob: Blob = await axios.get("/api/rapid", {
            params: { url },
            responseType: "blob"
        })
            .then(response => response.data);

        console.log(blob);
        if (blob)
            downloadFile(blob, "rapidapi-video.mp4");
>>>>>>> dae9ea0 (Change response type of the api/rapid endpoint)
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

