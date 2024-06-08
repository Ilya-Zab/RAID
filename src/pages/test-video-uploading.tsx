import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function TestPage() {
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState<any>(null);
    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        await axios.post("/api/video-uploader", { url })
            .then(response => setResult(response.data))
            .catch(err => setResult(err.response));
    }

    return (
        <div>
            <h1>Upload video</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="videoUrlEditor">Enter URL-address of your video</label><br/>
                <input
                    id="videoUrlEditor"
                    type="url"
                    placeholder="Enter URL-address"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <br/>
                <button
                    type="submit"
                >Send</button>
            </form>

            <h2>API response</h2>
            
            <pre>
                {JSON.stringify(result, null, 4)}
            </pre>
        </div>
    );
}
