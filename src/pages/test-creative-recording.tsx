"use client"

import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder"
import useCreateCreative from "@/hooks/useCreateCreative";
import useVideoProcessor from "@/hooks/useVideoProcessor";
import axios from "axios";
    import { useEffect, useState } from "react";

export default function TestCreativeRecording() {
    const { createCreativeAsBlob, success, data, error } = useCreateCreative();
    const [video, setVideo] = useState<Blob | null>(null);
    
    useEffect(() => {
        if (!video) return;

        createCreativeAsBlob(video);
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
                <h2>Creation result</h2>

                {success && <p><b>All is good! creative created successfully.</b></p>}
                {!success && <p><b>Oh, no! Error occured...</b></p>}

                <pre>
                    {success && JSON.stringify(data, null, 4)}
                    {!success && JSON.stringify(error, null, 4)}
                </pre>
            </div>
        </div>
    );
}
