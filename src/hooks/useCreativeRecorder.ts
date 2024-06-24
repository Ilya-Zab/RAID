"use client"

import { DeepAR } from "deepar"
import { useEffect, useState } from "react"

interface CreativeRecorderOptions {
    deepAR: DeepAR | null,
    firstPartTimeSeconds?: number,
    secondPartTimeSeconds?: number,
}

export type CreativeRecorderResult = { 
    startRecording: () => Promise<void>, 
    finishRecording: () => Promise<void>, 
    getPermissions: () => Promise<boolean>,
    isRecording: boolean, 
    video: Blob | null 
};

export default function useCreativeRecorder({
    deepAR,
    firstPartTimeSeconds = 10,
    secondPartTimeSeconds = 10
}: CreativeRecorderOptions) : CreativeRecorderResult
{
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [video, setVideo] = useState<Blob | null>(null);
    
    async function startRecording() {
        if (!deepAR)
            throw new Error("DeepAR library is not initialized.");
        
        await deepAR.startVideoRecording();
        setVideo(null);
        setIsRecording(true);
    }

    async function finishRecording() {
        if (!deepAR)
            throw new Error("DeepAR library is not initialized.");

        const video = await deepAR.finishVideoRecording();
        setVideo(video);
        setIsRecording(false);
    }

    async function getPermissions(): Promise<boolean> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        }
        catch {
            return false;
        }
    }

    return { startRecording, finishRecording, getPermissions, isRecording, video };
}
