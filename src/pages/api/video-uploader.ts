import { uploadVideo as uploadVideoAsUrl, uploadVideoAsBuffer } from "@/services/VideoUploader/VideoUploaderService";
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(400).json({ message: "Only POST method available for this path." });

    const userToken = getUserToken(req);
    if (!userToken)
        return res.status(401).json({ message: "Only authorized users have access to this API." })

    if (req.headers['content-type']?.indexOf("application/json") > -1)
        return await handlePostingAsUrl(req, res, userToken);
    else if (req.headers['content-type'].indexOf("multipart/form-data") > -1)
        return await handlePostingAsFile(req, res, userToken);
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
    const body = Buffer.from(req.read()).toString("utf-8");
    const json = JSON.parse(body);
    const { success, data, error } = UploadVideoBodySchema.safeParse(json);
    if (!success || !data)
        return res.status(400).json({ message: "Uncorrect body format.", error });

    try {
        const videoItem = await uploadVideoAsUrl(data.url, userToken);

        return res.status(200).json(videoItem);
    }
    catch (e: any) {
        console.error("APIERROR: Error occured while uploading video into WordPress.", e);
        return res.status(500).json({ message: e?.message });
    }
}

async function handlePostingAsFile(req: NextApiRequest, res: NextApiResponse, userToken: string)  {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error while parsing form data in the video uploading request.", err);
            res.status(500).json({ message: "Error while parsing form data in the video uploading request.", error: err });
            return;
        }

const videoFile: any = Array.isArray(files.video) && files.video.length > 0 ? files.video[0] : files.video;
        
        if (!videoFile || !videoFile.filepath || !existsSync(videoFile.filepath)) {
            console.error("Error while reading uploaded file in the video uploading request. File:", videoFile);
            res.status(500).json({ message: "Error while reading uploaded file in the video uploading request." });
            return;
        }

        if (!videoFile.mimetype || videoFile.mimetype !== "video/mp4") {
            console.error(`Error while processing uploaded file in the video uploading request. File mime type should be "video/mp4", but was "`, videoFile.mimetype, `"`);
            res.status(500).json({ message: `Error while processing uploaded file in the video uploading request. File mime type should be "video/mp4", but was "${videoFile.mimetype}"` });
            return;
        }

        const videoBuffer = readFileSync(videoFile.filepath);
        unlinkSync(videoFile.filepath);

        console.debug("BUFFER:", videoBuffer);

        const videoItem = await uploadVideoAsBuffer(videoBuffer, userToken)
        
        res.status(200).json(videoItem);
    });

    return res;
}
