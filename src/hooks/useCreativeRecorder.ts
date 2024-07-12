"use client"

import { DeepAR } from "deepar"
import { useEffect, useRef, useState } from "react"

interface CreativeRecorderOptions
{
    deepAR: DeepAR | null,
    firstPartTimeSeconds?: number,
    secondPartTimeSeconds?: number,
}

export type CreativeRecorderResult = {
    startRecording: () => Promise<void>,
    finishRecording: () => Promise<void>,
    getPermissions: () => Promise<boolean>,
    switchEffect: (effect: string | ArrayBuffer) => Promise<void>,
    isRecording: boolean,
    video: Blob | null
};

export default function useCreativeRecorder({
    deepAR,
    firstPartTimeSeconds = 6.5,
    secondPartTimeSeconds = 37.5
}: CreativeRecorderOptions): CreativeRecorderResult
{
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [video, setVideo] = useState<Blob | null>(null);
    const currentEffectRef = useRef<string | ArrayBuffer | null>(null);

    async function startRecording()
    {
        if (!deepAR)
            throw new Error("DeepAR library is not initialized.");

        await deepAR.startVideoRecording();
        setVideo(null);
        setIsRecording(true);
    }

    async function finishRecording()
    {
        if (!deepAR)
            throw new Error("DeepAR library is not initialized.");

        const video = await deepAR.finishVideoRecording();
        setVideo(video);
        setIsRecording(false);
    }

    async function getPermissions(): Promise<boolean>
    {
        try
        {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        }
        catch
        {
            return false;
        }
    }

    async function switchEffect(effect: string | ArrayBuffer): Promise<void> {
        if (!deepAR)
            throw new Error("DeepAR library is not initialized.");
        
        if (effect == currentEffectRef.current)
            return;

        currentEffectRef.current = effect;
        await deepAR.switchEffect(effect);
    }

    return { startRecording, finishRecording, getPermissions, switchEffect, isRecording, video };
}
