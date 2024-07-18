import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';


// export async function compressVideo(video: Blob): Promise<Blob>
// {
//     const ffmpeg = new FFmpeg();
//     await ffmpeg.load();

//     await ffmpeg.writeFile('input.mp4', await fetchFile(video));
//     await ffmpeg.exec(['-i', 'input.mp4', '-c:v', 'libx264', '-crf', '23', 'output.mp4']);
//     const compressedData = await ffmpeg.readFile('output.mp4');
//     return new Blob([compressedData], { type: 'video/mp4' });
// }



export async function compressVideo(videoFile)
{
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
    await ffmpeg.exec([
        '-i', 'input.mp4', '-c:v', 'libx264', '-crf', '23', '-b:v', '500k', '-c:a', 'copy', 'output.mp4'
    ]);
    const compressedData = await ffmpeg.readFile('output.mp4');
    return new Blob([compressedData], { type: "video/mp4" });
}