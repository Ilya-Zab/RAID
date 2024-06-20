"use client"

import useDeepAR from "@/hooks/useDeepAR"

export default function TestCreativeRecording() {
    const deepAR = useDeepAR("#ar-screen");

    // div element to display video from DeepAR library should has specified size 
    return (
        <div>
            <h1>Try to record creative now!</h1>

            <div id="ar-screen" style={{ width: "640px", height: "480px" }}></div>
        </div>
    )
}