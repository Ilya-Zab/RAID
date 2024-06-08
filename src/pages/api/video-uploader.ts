import { uploadVideo } from '@/services/VideoUploader/VideoUploaderService';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// this disabling of the response size limiter is required, because videos to upload can be more then default max 4MB for the request.
// See: https://nextjs.org/docs/messages/api-routes-response-size-limit
export const config = {
    api: {
        responseLimit: false,
    }
}

const UploadVideoBodySchema = z.object({
    url: z.string().url()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if (req.method != "POST")
        return res.status(400).json({ message: "Only POST method available for this path." });

    const userToken = getUserToken(req);
    if (!userToken)
        return res.status(401).json({ message: "Only authorized users have access to this API." })
    
    const { success, data } = UploadVideoBodySchema.safeParse(req.body);
    if (!success || !data)
        return res.status(400).json({ message: "Uncorrect body format." });
    
    try {
        const videoItem = await uploadVideo(data.url, userToken);
        return res.status(200).json(videoItem);
    }
    catch (e: any) {
        console.error("APIERROR: Error occured while uploading video into WordPress.", e);
        return res.status(500).json({
            message: e?.message
        });
    }
}

// gets user token by Cookie request header
function getUserToken(req: NextApiRequest): string | null {
    const cookies = req.headers.cookie?.split("; ") ?? [];
    const userTokenCookie = cookies.find(c => c.startsWith("userToken="));

    if (!userTokenCookie)
        return null;

    const userToken = userTokenCookie.substring(userTokenCookie.indexOf("=") + 1);
    return userToken;
}