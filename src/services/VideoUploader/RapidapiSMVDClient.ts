import axios, { AxiosRequestConfig } from "axios";
import { z } from "zod";

export interface RapidapiConfig {
    rapidapiKey: string
}

const VideoLinkSchema = z.object({
    quality: z.string(),
    link:z.string().url()
});

const SMVDResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().nullable(), // I doesn't find information about response type schemas
    src_url: z.string().optional(),
    image: z.string().optional(),
    title: z.string().optional(),
    links: z.array(VideoLinkSchema).optional()
});

export type SMVDResponse = z.infer<typeof SMVDResponseSchema>;
export type VideoLink = z.infer<typeof VideoLinkSchema>;

// this class is a wrapper around the Rapidapi API for downloading social media videos
// docs: https://rapidapi.com/ugoBoy/api/social-media-video-downloader/
export class RapidapiSMVDClient {
    private _options: RapidapiConfig;

    constructor(options: RapidapiConfig) {
        this._options = options;
    }

    public async extractVideo(videoUrl: string): Promise<SMVDResponse> {
        const options = this.getOptions(videoUrl);

        const response = await axios.request<SMVDResponse>(options)
            .then(response => response.data)
            .catch(err => {
                console.error("Error occured while downloading video.")
                throw err;
            });

        const { success, data, error } = SMVDResponseSchema.safeParse(response);

        console.error("ZODERROR:", error);
        if (!success)
            throw new Error("Invalid response was received by Social Media Video Downloader API.");
        if (!data.success)
            throw new Error(response.message ?? "Not succeded response was received from Social Media Video Downloader API.");

        return data;
    }

    private getOptions(videoUrl: string): AxiosRequestConfig {
        if (!this.isValidUrl(videoUrl))
            throw new Error(`The "${videoUrl}" URL-address is invalid.`);

        const options = {
            method: "GET",
            url: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all",
            params: {
                url: videoUrl,
                filename: "test-video"
            },
            headers: {
                "X-RapidAPI-Key": this._options.rapidapiKey,
                "X-RapidAPI-Host": "social-media-video-downloader.p.rapidapi.com"
            }
        };

        return options;
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
}

// returns link of the object with minimal quality of the given in the SMVD API response
export function getLinkWithMinQuality(response: SMVDResponse): VideoLink {
    const qualities: string[] = ["1080", "720", "540", "480", "360", "240", "144"];

    for (const quality of qualities.reverse()) {
        const link = response.links.find(l => l.quality.includes(quality));
        if (link)
            return link;
    }

    throw new Error("Error while defining video with min quality.");
}

const config: RapidapiConfig = {
    rapidapiKey: process.env.RAPIDAPI_KEY || ""
};

const smvdClient = new RapidapiSMVDClient(config);
export default smvdClient;
