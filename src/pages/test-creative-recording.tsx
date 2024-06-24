"use client"

import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder"
import useVideoProcessor from "@/hooks/useVideoProcessor";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function TestCreativeRecording() {
    const [video, setVideo] = useState<Blob | null>(null);
    
    function handleContinueClick(video: Blob) {
        if (!video) return;
        
        downloadVideo(video, "video.mp4");
    }

    return (
        <div>
            <h1>Try to record creative now!</h1>

            <CreativeRecorder
                onContinueClick={handleContinueClick}
            />
        </div>
    )
}
