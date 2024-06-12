import axios from "axios";
import smvdClient, { SMVDResponse, VideoLink, getLinkWithMinQuality } from "./RapidapiSMVDClient";
import wpRestApi from "../wordpress/wpService";

export interface WPVideoItem {
    id: string,
    slug: string,
    link: string
}

export interface WPUserInfo {
    id: number,
    slug: string
}

async function uploadVideo(url: string, userToken: string): Promise<WPVideoItem> {
    const userInfo = await getUserInfo(userToken);
    const extractedVideo = await smvdClient.extractVideo(url);
    const videoLink = getLinkWithMinQuality(extractedVideo);
    const videoBuffer = await getVideo(videoLink.link);
    const videoFileName = generateFileName("mp4");
    
    const videoItem = await postVideo(videoBuffer, videoFileName, userInfo.id);
    return videoItem;
}

// gets random file name with specified file extension
function generateFileName(extension: string): string {
    const template = `####-####-####-####.${extension}`;
    const characters = "ABCDEF1234567890";
    return template.replace(/[#]/g, () => characters.charAt(Math.floor(Math.random() * characters.length)));
}

// gets info about user which related with specified user token
async function getUserInfo(userToken: string): Promise<WPUserInfo> {
    const data = await wpRestApi.get("users/me", undefined, {
        // specified "Authorization" header overloads default admin credentials
        "Authorization": `Bearer ${userToken}`
    })
    .then(response => response.data)
    .catch(err => {
        console.error("Error while getting user info by WordPress.");
        throw err;
    });

    return data as WPUserInfo;
}

// gets video as a Buffer object by their URL-address
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

// posts video into WordPress with specified file name and author ID
async function postVideo(videoBuffer: Buffer, videoFileName: string, authorId: number): Promise<WPVideoItem> {
    const params = {
        author: authorId
    };
    const headers = {
        "Content-Type": "video/mp4",
        "Content-Disposition": `    attachment; filename="${videoFileName}"`
    };
    const data = await wpRestApi.post("media", videoBuffer, params, headers)
    .then(response => response.data)
    .catch(err => {
        console.error("Error while posting video into WordPress.");
        throw err;
    });

    return data as WPVideoItem;
}

export { uploadVideo };
