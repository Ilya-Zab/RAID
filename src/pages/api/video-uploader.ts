import { uploadVideo } from '@/services/VideoUploader/VideoUploaderService';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export const config = {
    api: {
        responseLimit: false,
    }
}

const UploadVideoBodySchema = z.object({
    url: z.string().url()
});

type UploadVideoBody = z.infer<typeof UploadVideoBodySchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if (req.method != "POST")
        return res.status(400).json({ message: "Only POST method available for this path." });
    
    const { success, data, error } = UploadVideoBodySchema.safeParse(req.body);

    if (!success)
        return res.status(400).json({ message: "Uncorrect body format." });
    
    try {
        const videoItem = await uploadVideo(data.url);
        return res.status(200).json(videoItem);
    }
    catch (e: any) {
        console.error("APIERROR:", e);
        return res.status(500).json({
            message: e?.message
        });
    }
}
