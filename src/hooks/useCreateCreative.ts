import { useFetchUserDataQuery, useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export type CreateCreativeResult = {
    createCreativeAsUrl: (url: string) => Promise<void>,
    createCreativeAsBlob: (video: number, author: number, featuredMedia: number, creativeName) => Promise<void>,
    uploadVideoByUserToken: (video: Blob, featuredMedia: number, creativeName: string) => Promise<void>,
    uploadPictureByUserToken: (image: Blob, creativeName: string) => Promise<void>,
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

    async function uploadVideoByUserToken(video: Blob, featuredMedia: number, creativeName: string): Promise<void>
    {
        if (!cookies.userToken)
            setError(new Error('This user is not allowed to make post requests.'));

        try
        {
            await fetchUserData(cookies.userToken);
            const formData = new FormData();
            formData.append('file', video, 'video.mp4');

            const response = await fetch('https://wordpress.wefinallyplayedit.com/wp-json/wp/v2/media', {
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
            await createCreativeAsBlob(data.id, data.author, featuredMedia, creativeName);
        } catch (err)
        {
            setSuccess(false);
            setData(null);
            setError(err);
        }
    };

    async function uploadPictureByUserToken(image: Blob, creativeName: string): Promise<void>
    {
        if (!cookies.userToken)
            setError(new Error('This user is not allowed to make post requests.'));
        console.log(cookies.userToken);

        try
        {
            const parts = image.type.split('/');
            const nameType = parts[1];
            await fetchUserData(cookies.userToken);
            const formData = new FormData();
            formData.append('file', image, `iamge.${nameType}`);

            const response = await fetch('https://wordpress.wefinallyplayedit.com/wp-json/wp/v2/media', {
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
            await createCreativeImageAsBlob(data.id, data.author, creativeName);
        } catch (err)
        {
            setSuccess(false);
            setData(null);
            setError(err);
        }
    }

    async function createCreativeAsBlob(video: number, authorId: number, featuredMedia: number, creativeName: string): Promise<void>
    {
        const formData = new FormData();
        const videoId = video.toString();
        const media = featuredMedia.toString();
        const author = authorId.toString();
        formData.append("video", videoId);
        formData.append("author", author);
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

    async function createCreativeImageAsBlob(image: number, authorId: number, creativeName: string): Promise<void>
    {
        const formData = new FormData();
        const imageId = image.toString();
        const author = authorId.toString();
        formData.append("image", imageId);
        formData.append("author", author);
        formData.append("media", imageId);
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

    return { createCreativeAsUrl, createCreativeAsBlob, uploadVideoByUserToken, uploadPictureByUserToken, success, data, error };
}
