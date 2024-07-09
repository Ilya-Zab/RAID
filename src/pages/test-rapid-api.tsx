import axios from "axios";
import { FormEvent, useRef, useState } from "react";

export default function TestRapidApi() {
    const [url, setUrl] = useState<string>("");
    const isRequestedRef = useRef<boolean>(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        axios("/api/rapid", {
            params: {
                url
            }
        })
            .then(response => alert(JSON.stringify(response.data)))
            .catch(err => alert(JSON.stringify(err.response.data)));
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
                </div>
        </div>
    );
}
