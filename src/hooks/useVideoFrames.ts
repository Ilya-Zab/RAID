import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./redux";
import { setFrames } from "@/store/slice/creativeFramesSlice";

export const useVideoFrames = () =>
{
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() =>
    {
        const load = async () =>
        {
            ffmpegRef.current?.on("log", msg => setMessages(msgs => [...msgs, `${msg.type} - ${msg.message}`]));
            const baseUrl = "/lib/ffmpeg-core";
            await ffmpegRef.current?.load({
                coreURL: `${baseUrl}/ffmpeg-core.js`,
                wasmURL: `${baseUrl}/ffmpeg-core.wasm`
            });
            setIsLoaded(true);
        };

        ffmpegRef.current = new FFmpeg();
        load();
    }, []);

    async function extractAllFrames(video: Blob): Promise<string[]>
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

        await ffmpeg.writeFile(videoName, await fetchFile(video));

        await ffmpeg.exec([
            "-i", videoName,
            "-vf", "thumbnail,scale=-1:576,crop=ih*9/16:ih",
            "-vsync", "vfr",
            frameNamePattern
        ]);

        const frames: string[] = [];
        let frameIndex = 1;

        while (true)
        {
            const frameFileName = frameNamePattern.replace("%d", frameIndex.toString());
            try
            {
                const data = await ffmpeg.readFile(frameFileName) as Uint8Array;
                const frame = new Blob([data.buffer], { type: 'image/png' });
                const blobUrl = URL.createObjectURL(frame).replace('blob:', '');
                frames.push(blobUrl);
                frameIndex++;
            } catch (error)
            {
                console.error("Error reading frame:", error);
                break;
            }
        }
        dispatch(setFrames(frames));
        setLoading(false);
        return frames;
    }
    return { extractAllFrames, isLoading };

}