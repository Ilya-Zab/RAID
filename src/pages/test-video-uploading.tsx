import useCreateCreative from "@/hooks/useCreateCreative";
import axios from "axios";
import { create } from "domain";
import { FormEvent, useEffect, useState } from "react";

export default function TestPage() {
    const [url, setUrl] = useState<string>("");
    const { createCreativeAsUrl, success, data, error } = useCreateCreative();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        createCreativeAsUrl(url);
    }

    return (
        <div>
            <h1>Upload video</h1>

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
                <h2>Creation result</h2>

                {success && <p><b>All is good! creative created successfully.</b></p>}
                {!success && <p><b>Oh, no! Error occured...</b></p>}

                <pre>
                    {success && JSON.stringify(data, null, 4)}
                    {!success && JSON.stringify(error, null, 4)}
                </pre>
            </div>
        </div>
    );
}
