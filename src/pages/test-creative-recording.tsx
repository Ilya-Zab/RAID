"use client"

import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder"

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
    function handleContinueClick(video: Blob) {
        if (video)
            downloadVideo(video, "test-video.mp4");
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
