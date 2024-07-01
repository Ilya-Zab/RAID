import axios from "axios";
import { useState } from "react";

export type CreateCreativeResult = {
    createCreativeAsUrl: (url: string) => Promise<void>,
    createCreativeAsBlob: (video: Blob) => Promise<void>,
    success: boolean,
    data: any | null,
    error: Error | null
};

export default function useCreateCreative(): CreateCreativeResult {
    const [success, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<Error | null>(null);

    async function createCreativeAsUrl(url: string): Promise<void> {
        await axios.post("/api/video-uploader", { url })
        .then(response => {
            setSuccess(true);
            setData(response.data);
            setError(null);
        })
        .catch(err => {
            setSuccess(false);
            setData(null);
            setError(err);
        });
    }

    async function createCreativeAsBlob(video: Blob): Promise<void> {
        const formData = new FormData();
        formData.append("video", video);

        await axios.post("/api/video-uploader", formData)
            .then(response => {
                setSuccess(true);
                setData(response.data);
                setError(null);
            })
            .catch(err => {
                setSuccess(false);
                setData(null);
                setError(err);
            });
    }

    return { createCreativeAsUrl, createCreativeAsBlob, success, data, error };
}
