"use client"

import { DeepAR } from "deepar"
import { useEffect, useState } from "react"
import { CreativeRecorderService } from "../services/CreativeRecorder/CreativeRecorderService"

interface CreativeRecorderOptions {
    deepAR: DeepAR | null,
    firstPartTimeSeconds?: number,
    secondPartTimeSeconds?: number,
}

export default function useCreativeRecorder({
    deepAR,
    firstPartTimeSeconds = 10,
    secondPartTimeSeconds = 10
}: CreativeRecorderOptions): CreativeRecorderService | null
{
    const[creativeRecorder, setCreativeRecorder] = useState<CreativeRecorderService | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    useEffect(() => {
        if (deepAR) {
            const service = new CreativeRecorderService({
                deepAR,
                firstPartTimeSeconds,
                secondPartTimeSeconds
            });

            service.events.addEventListener("recordingStarted", () => setIsRecording(true));
            service.events.addEventListener("recordingFinished", () => setIsRecording(false));

            setCreativeRecorder(service);
        }
        else {
            setCreativeRecorder(null);
        }

        setIsRecording(false);
    }, [deepAR, firstPartTimeSeconds, secondPartTimeSeconds]);

    return creativeRecorder;
}
