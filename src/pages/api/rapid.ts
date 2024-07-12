import smvdClient, { getLinkWithMinQuality } from "@/services/VideoUploader/RapidapiSMVDClient";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Stream } from "stream";
import { z } from "zod";

// this disabling of the response size limiter is required, because videos to upload can be more then default max 4MB for the request.
// See: https://nextjs.org/docs/messages/api-routes-response-size-limit
export const config = {
    api: {
        responseLimit: false
    }
};

const QuerySchema = z.object({
    url: z.string().url()
});

// can get videos only from Facebook, Instagram, TikTok or YouTube
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET")
        return res.status(400).json({ message: "Only GET method available for this path." });
    
    const { success, data, error } = QuerySchema.safeParse(req.query);
    
    if (!success){
        console.error("QUERY VALIDATION ERROR:", error);
        return res.status(400).json({ message: `"url" query parameter is required.` });
    }

    try {
        const extractedVideo = await smvdClient.extractVideo(data.url);
        const videoLink = getLinkWithMinQuality(extractedVideo);
        
        // get target video as a stream
        const response = await axios.get<Stream>(videoLink.link, { responseType: "stream" });
 res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
       

        // redirect data stream from video download request into API response. MAGIC!
        response.data.pipe(res);
    }
    catch (e) {
        console.error("Error while getting video using RapidAPI.", e);
        return res.status(500).json({ message: e.message ?? "Error while getting video via RapidAPI." });
    }
}
