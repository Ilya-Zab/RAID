"use client"

import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder"
import useVideoProcessor from "@/hooks/useVideoProcessor";
import axios from "axios";
    import { useEffect, useState } from "react";

export default function TestCreativeRecording() {
    const [video, setVideo] = useState<Blob | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        if (!video) return;

        // functionality of the posting video into WordPress was temporary blocked for correct test deployment purposes
        // downloadVideo(video, "video.mp4");
        // return;

        async function uploadVideo() {
            const buffer = Buffer.from(await video.arrayBuffer());
            axios.post("/api/video-uploader", buffer)
                .then(response => {
                    setResult(response.data);
                    setIsUploaded(true);
                })
                .catch(err => setResult(err.response));
        }

        uploadVideo();
    }, [video]);
    
    function handleContinueClick(video: Blob) {
        if (video)
            setVideo(video);
    }

    return (
        <div>
            <h1>Try to record creative now!</h1>

            <CreativeRecorder
                onContinueClick={handleContinueClick}
            />
            
            <div>
                <h2>API response</h2>

                <pre>
                    {result && JSON.stringify(result, null, 4)}
                </pre>
            </div>
        </div>
    )
}

// used to test recorded videos
function downloadVideo(video: Blob, videoName: string) {
    const url = URL.createObjectURL(video);
    const a: any = document.createElement("a");

    a.href = url;
    a.download = videoName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
