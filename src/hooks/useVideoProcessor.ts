import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

export type UseVideoProcessorResult = {
    mergeVideoAndAudio: (video: Blob, audio1: Blob, audio2: Blob) => Promise<void>,
    isLoaded: boolean,
    messages: string[],
    output: Blob | null,
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

    async function mergeVideoAndAudio(video: Blob, audio1: Blob, audio2: Blob): Promise<void>
    {
        if (!video || !audio1 || !audio2) return;

        const videoName = "video.mp4";
        const audio1Name = "audio1.mp3";
        const audio2Name = "audio2.mp3";
        const outputName = "output.mp4";
        const ffmpeg = ffmpegRef.current;

        if (!ffmpeg)
            throw new Error("FFmpeg is not initialized.");

        await ffmpeg.writeFile(videoName, await fetchFile(video));
        await ffmpeg.writeFile(audio1Name, await fetchFile(audio1));
        await ffmpeg.writeFile(audio2Name, await fetchFile(audio2));
        await ffmpeg.exec([
            "-i", videoName,
            "-i", audio1Name,
            "-i", audio2Name,
            "-filter_complex", `[1:a][2:a]amix=inputs=2[a]`,
            "-map", "0:v",
            "-map", `[a]`,
            "-c:v", "libx264",
            "-b:v", "1000k",
            "-c:a", "aac",
            "-b:a", "128k",
            "-strict", "experimental",
            "-shortest", outputName]);

        const data = await ffmpeg.readFile(outputName) as Uint8Array;
        const output = new Blob([data.buffer], { type: "video/mp4" });

        setOutput(output);
    }

    return { mergeVideoAndAudio, messages, isLoaded, output };
}
