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
    const { mergeVideoAndAudio, isLoaded, output } = useVideoProcessor();
    const [video, setVideo] = useState<Blob | null>(null);
    const [music, setMusic] = useState<Blob | null>(null);

    useEffect(() => {
        axios.get("/audio/AR_CONTRAST.mp3", {
            responseType: "blob"
        })
        .then(response => setMusic(response.data));
    }, []);

    useEffect(() => {
        if (output) downloadVideo(output, "merged-video.mp4");
    }, [output])

    function handleContinueClick(video: Blob, audio: Blob) {
        if (!video || !audio || !music || !isLoaded) return;
        
        mergeVideoAndAudio(video, audio, music);
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
