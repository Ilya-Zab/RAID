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

        axios.post("/api/video-uploader", { video })
            .then(response => {
                setResult(response.data);
                setIsUploaded(true);
            })
            .catch(err => setResult(err.response));
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
                <h2>Result data</h2>

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
