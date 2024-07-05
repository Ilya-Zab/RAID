import axios from "axios";
import { useState } from "react";
import { z } from "zod";

export const useCreateWpMediaResult = z.object({
    isLoading: z.boolean(),
    data: z.any(),
    error: z.any(),
    createWpMedia: z.function().args(z.string()).returns(z.promise(z.void()))
});
// instanceof(Blob)

export type useCreateWpMediaResult = z.infer<typeof useCreateWpMediaResult>

export function useCreateWpMedia(): useCreateWpMediaResult
{
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(false);
    async function createWpMedia(media: string)
    {
        console.log('start');
        setLoading(true);
        const formData = new FormData();
        formData.append('media', media);
        try
        {
            const response = await axios({
                url: '/api/wp/media',
                method: 'POST',
                data: formData
            });
            setData(response.data);
        } catch (error)
        {
            setError(error);
        } finally
        {
            setLoading(false);
        }
    }

    return { data, error, isLoading, createWpMedia }
}  