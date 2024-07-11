import { useFetchUserDataQuery, useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export type CreateCreativeResult = {
    createCreativeAsUrl: (url: string) => Promise<void>,
    createCreativeAsBlob: (video: Blob, featuredMedia: number, creativeName) => Promise<void>,
    uploadVideoByUserToken: (video: Blob) => Promise<void>,
    success: boolean,
    data: any | null,
    error: Error | null
};

export default function useCreateCreative(): CreateCreativeResult
{
    const [success, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [cookies] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

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

    async function uploadVideoByUserToken(video: Blob): Promise<void>
    {
        if (!cookies.userToken)
            setError(new Error('This user is not allowed to make post requests.'));

        try
        {
            await fetchUserData(cookies.userToken);
            const formData = new FormData();
            formData.append('file', video, 'video.mp4');

            const response = await fetch('https://raid.digiway-dev.online/wp-json/wp/v2/media', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookies.userToken}`
                },
                body: formData
            });

            if (!response.ok)
            {
                setError(new Error(`Failed to upload video: ${response.statusText}`))
            }

            const data = await response.json();
            console.log('Video uploaded successfully:', data);
        } catch (err)
        {
            setError(err);
        }
    };

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

    return { createCreativeAsUrl, createCreativeAsBlob, uploadVideoByUserToken, success, data, error };
}