import axios from "axios";
import { useState } from "react";

export type CreateCreativeResult = {
    createCreativeAsUrl: (url: string) => Promise<void>,
    createCreativeAsBlob: (video: Blob, featuredMedia: number, creativeName) => Promise<void>,
    success: boolean,
    data: any | null,
    error: Error | null
};

export default function useCreateCreative(): CreateCreativeResult
{
    const [success, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<Error | null>(null);

    async function createCreativeAsUrl(url: string): Promise<void>
    {
        await axios.post("/api/video-uploader", { url })
            .then(response =>
            {
                setSuccess(true);
                setData(response.data);
                setError(null);
            })
            .catch(err =>
            {
                setSuccess(false);
                setData(null);
                setError(err);
            });
    }

    async function createCreativeAsBlob(video: Blob, featuredMedia: number, creativeName: string): Promise<void>
    {
        const formData = new FormData();
        const media = featuredMedia.toString();
        formData.append("video", video);
        formData.append("media", media);
        formData.append("title", creativeName);

        await axios.post("/api/video-uploader", formData)
            .then(response =>
            {
                setSuccess(true);
                setData(response.data);
                setError(null);
            })
            .catch(err =>
            {
                setSuccess(false);
                setData(null);
                setError(err);
            });
    }

    return { createCreativeAsUrl, createCreativeAsBlob, success, data, error };
}
