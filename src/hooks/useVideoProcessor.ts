import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

export type UseVideoProcessorResult = {
    mergeVideoAndAudio: (video: Blob, audio: Blob) => Promise<void>,
    isLoaded: boolean,
    messages: string[],
    output: Blob | null
};

export default function useVideoProcessor(): UseVideoProcessorResult
{
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [output, setOutput] = useState<Blob | null>(null);
    const ffmpegRef = useRef<FFmpeg | null>(null);

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

    async function mergeVideoAndAudio(video: Blob, audio: Blob): Promise<void>
    {
        if (!video || !audio) return;

        const videoName = "video.mp4";
        const audioName = "audio.mp3";
        const outputName = "output.mp4";
        const ffmpeg = ffmpegRef.current;

        if (!ffmpeg)
            throw new Error("FFmpeg is not initialized.");

        await ffmpeg.writeFile(videoName, await fetchFile(video));
        await ffmpeg.writeFile(audioName, await fetchFile(audio));
        await ffmpeg.exec(["-i", videoName, "-i", audioName, "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", "-shortest", outputName]);

        const data = await ffmpeg.readFile(outputName) as Uint8Array;
        const output = new Blob([data.buffer], { type: "video/mp4" });

        setOutput(output);
    }

    return { mergeVideoAndAudio, messages, isLoaded, output };
}