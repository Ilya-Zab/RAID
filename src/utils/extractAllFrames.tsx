import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function extractAllFrames(video: Blob, ffmpeg): Promise<void>
{
    if (!video) return;

    const videoName = "video.mp4";
    const frameName = "frame.png";

    if (!ffmpeg)
        throw new Error("FFmpeg is not initialized.");

    await ffmpeg.writeFile(videoName, await fetchFile(video));
    await ffmpeg.exec([
        "-i", videoName,
        "-vf", "thumbnail,scale=320:240",
        "-frames:v", "1",
        frameName
    ]);

    const data = await ffmpeg.readFile(frameName) as Uint8Array;
    const frame = new Blob([data.buffer], { type: 'image/png' });

    // setFirstFrame(frame);
}