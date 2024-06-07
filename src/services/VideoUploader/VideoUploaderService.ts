import axios from "axios";
import smvdClient, { SMVDResponse, VideoLink } from "./RapidapiSMVDClient";
import wpRestApi from "../wordpress/wpService";

export interface WPVideoItem {
    id: string,
    slug: string,
link: string
}

async function uploadVideo(url: string): Promise<WPVideoItem> {
    const extractedVideo = await smvdClient.extractVideo(url);
    const videoLink = getLinkWithMinQuality(extractedVideo);
    const videoBuffer = await getVideo(videoLink.link);
    const videoFileName = generateFileName("mp4");
    
    const videoItem = await postVideo(videoBuffer, videoFileName);
    return videoItem;
}

function getLinkWithMinQuality(response: SMVDResponse): VideoLink {
    const qualities: string[] = ["1080", "720", "540", "480", "360", "240", "144"];

    for (const quality of qualities.reverse()) {
        const link = response.links.find(l => l.quality.includes(quality));
        if (link)
            return link;
    }

    throw new Error("Error while defining video with min quality.");
}

function generateFileName(extension: string): string {
    const template = `####-####-####-####.${extension}`;
    const characters = "ABCDEF1234567890";
    return template.replace(/[#]/g, () => characters.charAt(Math.floor(Math.random() * characters.length)));
}

async function getVideo(url: string): Promise<Buffer> {
    return await axios.get(url, {
        responseType: "arraybuffer"
    })
    .then(response => response.data)
.catch(err => {
    console.error(`Error while downloading video. URL: "${url}".`);
    throw err;
});
}

async function postVideo(videoBuffer: Buffer, videoFileName: string): Promise<WPVideoItem> {
    const data = await wpRestApi.post("/wp-json/wp/v2/media", videoBuffer, {
        "Content-Type": "video/mp4",
                        "Content-Disposition": `    attachment; filename="${videoFileName}"`
    })
        .then(response => response.data)
        .catch(err => {
            console.error("Error while posting video into WordPress.");
            throw err;
        });

        return data as WPVideoItem;
}

export { uploadVideo };
