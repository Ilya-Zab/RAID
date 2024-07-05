import { uploadMediaAsBuffer } from "@/services/VideoUploader/VideoUploaderService";
import wpRestApi from "@/services/wordpress/wpService";
import axios from "axios";
import * as formidable from "formidable";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// this disabling of the request and response size limiter is required, because videos to upload can be more then default max 4MB for the request.
// See: https://nextjs.org/docs/messages/api-routes-response-size-limit
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

        if (!mediaFile.mimetype || mediaFile.mimetype !== "image/png")
        {
            console.error(`Error while processing uploaded file in the video uploading request. File mime type should be "video/mp4", but was "`, mediaFile.mimetype, `"`);
            res.status(500).json({ message: `Error while processing uploaded file in the video uploading request. File mime type should be "video/mp4", but was "${mediaFile.mimetype}"` });
            return;
        }

        const videoBuffer = readFileSync(mediaFile.filepath);
        unlinkSync(mediaFile.filepath);
        console.log('Second Result:', videoBuffer);

        try
        {
            const mediaItem = await uploadMediaAsBuffer(videoBuffer, userToken);
            return res.status(200).json({ message: "File uploaded successfully", mediaItem });
        } catch (uploadError)
        {
            console.error("Error uploading media buffer", uploadError);
            return res.status(500).json({ message: "Error uploading media buffer", error: uploadError });
        }

        // const mediaItem = await uploadMediaAsBuffer(videoBuffer, userToken);
        // await registerUserCreative(videoItem.id, videoItem.author, res);
    });

    return res;
}

// registrate video as a creative of the specified user using custom WordPress API.
// async function registerUserCreative(videoId: number, authorId: number, res: NextApiResponse): Promise<void>
// {
//     const requestBody = {
//         title: "By json 3",
//         author: authorId,
//         status: "pending",
//         "meta": {
//             featured_media: videoId
//         }
//     };

//     await wpRestApi.post("creative", requestBody)
//         .then(response =>
//         {
//             res.status(200).json(response.data);
//         })
//         .catch(err =>
//         {
//             console.error("Error while registration video as a user creative.", err);
//             res.status(500).json({ message: "Error while registration video as a user creative.", error: err });
//         });
// }   
