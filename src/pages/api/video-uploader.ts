import { uploadVideo, uploadVideoAsBlob } from '@/services/VideoUploader/VideoUploaderService';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// this disabling of the response size limiter is required, because videos to upload can be more then default max 4MB for the request.
// See: https://nextjs.org/docs/messages/api-routes-response-size-limit
export const config = {
    api: {
        responseLimit: false,
        bodyParser: false
    }
}

const UploadVideoBodySchema = z.object({
    url: z.string().url()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(400).json({ message: "Only POST method available for this path." });

    const userToken = getUserToken(req);
    if (!userToken)
        return res.status(401).json({ message: "Only authorized users have access to this API." })
    
    try {
        const videoBuffer = Buffer.from(req.read());
    console.debug("Buffer:", videoBuffer);
    const videoItem = await uploadVideoAsBlob(videoBuffer, userToken);

    return res.status(200).send( videoItem );
    }
    catch (e) {
        console.error("Error while handling video posting request.", e);
        return res.status(500).json({ message: "Error while handling video posting request.", error: e });
    }
    
    if (req.headers['content-type'] == "application/json")
        return await handlePostingAsUrl(req, res, userToken);
    else if (req.headers['content-type'].indexOf("multipart/form-data") > -1)
        return await handlePostingAsBlob(req, res, userToken);
    else
        return res.status(400).json({ message: `Unsupported request content type: "${req.headers['content-type']}".` });
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

async function handlePostingAsUrl(req: NextApiRequest, res: NextApiResponse, userToken: string) {
    const { success, data, error } = UploadVideoBodySchema.safeParse(req.body);
    if (!success || !data)
        return res.status(400).json({ message: "Uncorrect body format.", error });

    try {
        const videoItem = await uploadVideo(data.url, userToken);

        return res.status(200).json(videoItem);
    }
    catch (e: any) {
        console.error("APIERROR: Error occured while uploading video into WordPress.", e);
        return res.status(500).json({ message: e?.message });
    }
}

export async function handlePostingAsBlob(req: NextApiRequest, res: NextApiResponse, userToken: string) {

}
