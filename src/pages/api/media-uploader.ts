import { uploadMediaAsBuffer } from "@/services/VideoUploader/VideoUploaderService";
import wpRestApi from "@/services/wordpress/wpService";
import axios from "axios";
import * as formidable from "formidable";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const config = {
    api: {
        responseLimit: false,
        bodyParser: false
    }
};

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

    if (req.headers['content-type'].indexOf("multipart/form-data") > -1)
        return await handlePostingAsFile(req, res, userToken);
    else
        return res.status(400).json({ message: `Unsupported request content type: "${req.headers['content-type']}".` });
}

// gets user token by Cookie request header
function getUserToken(req: NextApiRequest): string | null
{
    const cookies = req.headers.cookie?.split("; ") ?? [];
    const userTokenCookie = cookies.find(c => c.startsWith("userToken="));

    if (!userTokenCookie)
        return null;

    const userToken = userTokenCookie.substring(userTokenCookie.indexOf("=") + 1);
    return userToken;
}

async function handlePostingAsFile(req: NextApiRequest, res: NextApiResponse, userToken: string)
{
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) =>
    {
        if (err)
        {
            console.error("Error while parsing form data in the video uploading request.", err);
            res.status(500).json({ message: "Error while parsing form data in the video uploading request.", error: err });
            return;
        }
        const mediaFile: any = Array.isArray(files.media) && files.media.length > 0 ? files.media[0] : files.media;

        if (!mediaFile || !mediaFile.filepath || !existsSync(mediaFile.filepath))
        {
            console.error("Error while reading uploaded file in the video uploading request. File:", mediaFile);
            res.status(500).json({ message: "Error while reading uploaded file in the video uploading request." });
            return;
        }

        if (!mediaFile.mimetype || mediaFile.mimetype !== "image/png" || mediaFile.mimetype !== "image/jpeg" || mediaFile.mimetype !== "image/gif")
        {
            console.log('MimeTypee', mediaFile.mimetype !== "image/gif")
            console.error(`Error while processing uploaded file in the video uploading request. File with this type cannot be added, but was "`, mediaFile.mimetype, `"`);
            res.status(500).json({ message: `Error while processing uploaded file in the video uploading request. File mime type should be "video/mp4", but was "${mediaFile.mimetype}"` });
            return;
        }

        const videoBuffer = readFileSync(mediaFile.filepath);
        unlinkSync(mediaFile.filepath);
        try
        {
            const mediaItem = await uploadMediaAsBuffer(videoBuffer, userToken);
            return res.status(200).json({ message: "File uploaded successfully", mediaItem });
        } catch (uploadError)
        {
            console.error("Error uploading media buffer", uploadError);
            return res.status(500).json({ message: "Error uploading media buffer", error: uploadError });
        }
    });

    return res;
}