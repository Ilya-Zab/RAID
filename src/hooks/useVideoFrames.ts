import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { framesType } from "@/types/slices/creativeSlice";

export const useVideoFrames = () =>
{
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() =>
    {
        const load = async () =>
        {
            ffmpegRef.current?.on("log", msg => setMessages(msgs => [...msgs, `${msg.type} - ${msg.message}`]));
            const baseUrl = "/lib/ffmpeg-core";
            try
            {
                await ffmpegRef.current?.load({
                    coreURL: `${baseUrl}/ffmpeg-core.js`,
                    wasmURL: `${baseUrl}/ffmpeg-core.wasm`
                });
                setIsLoaded(true);
            } catch (error)
            {
                console.error("Error loading FFmpeg:", error);
            }
        };

        ffmpegRef.current = new FFmpeg();
        load();
    }, []);

    async function extractAllFrames(video: Blob): Promise<framesType>
    {
        if (!video) return [];
        setLoading(true);
        const videoName = "video.mp4";
        const frameNamePattern = "frame_%d.png";
        const ffmpeg = ffmpegRef.current;

        if (!ffmpeg)
        {
            throw new Error("FFmpeg is not initialized.");
        }

        try
        {
            await ffmpeg.writeFile(videoName, await fetchFile(video));
            await ffmpeg.exec([
                "-i", videoName,
                "-vf", "fps=1",
                frameNamePattern
            ]);
            const frames: framesType = [];
            let frameIndex = 1;

            while (true)
            {
                const frameFileName = frameNamePattern.replace("%d", frameIndex.toString());
                try
                {
                    const data = await ffmpeg.readFile(frameFileName) as Uint8Array;
                    const frame = new Blob([data.buffer], { type: 'image/png' });
                    const blobUrl = URL.createObjectURL(frame);
                    frames.push({
                        frameBlob: frame,
                        frameUrl: blobUrl
                    });
                    frameIndex++;
                } catch (error)
                {
                    console.error(`Error reading frame ${frameFileName}:`, error);
                    break;
                }
            }
            setLoading(false);
            return frames;
        } catch (error)
        {
            console.error("Error extracting frames:", error);
            setLoading(false);
            return [];
        }
    }
    return { extractAllFrames, isLoading };
}
