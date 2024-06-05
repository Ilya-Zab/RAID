import axios, { AxiosRequestConfig } from "axios";

export interface RapidapiConfig {
    rapidapiKey: string
}

export interface SMVDResponse {
    success: boolean,
    message: any, // I doesn't find information about response type schemas
    src_url: string,
    image: string,
    title: string,
    links: VideoLink[]
}

export interface VideoLink {
    quality: string,
    link:string
}

// this class is a wrapper around the Rapidapi API for downloading social media videos
// docs: https://rapidapi.com/ugoBoy/api/social-media-video-downloader/
export class RapidapiSMVDClient {
    private _options: RapidapiConfig;

    constructor(options: RapidapiConfig) {
        this._options = options;
    }

    public async extractVideo(videoUrl: string): Promise<SMVDResponse> {
        const options = this.getOptions(videoUrl);

        return await axios.request(options)
            .then(response => response.data)
            .catch(err => {
                console.error("Error occured while downloading video.")
                throw err;
            });
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

const config: RapidapiConfig = {
    rapidapiKey: process.env.RAPIDAPI_KEY || ""
};

const smvdClient = new RapidapiSMVDClient(config);
export default smvdClient;
