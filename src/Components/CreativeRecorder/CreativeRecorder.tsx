"use client"

import useDeepAR from "../../hooks/useDeepAR";
import useCreativeRecorder from "../../hooks/useCreativeRecorder";
import { useEffect, useRef } from "react";
import StartStopButton from "./StartStopButton";
import { EffectItem, EffectPicker } from "./EffectPicker";
import useAudioRecorder from "@/hooks/useAudioRecorder";

// div element for displaying video should has fixed size
const ARScreenStyle = {
    width: "640px",
    height: "480px"
}

const effects: EffectItem[] = [
    {
        name: "Aviators",
        url: "https://cdn.jsdelivr.net/npm/deepar@5.6.5/effects/aviators"
    },
    {
        name: "Dalmatian",
        url: "https://cdn.jsdelivr.net/npm/deepar@5.6.5/effects/dalmatian"
    },
    {
        name: "Galaxy background",
        url: "https://cdn.jsdelivr.net/npm/deepar@5.6.5/effects/galaxy_background"
    },
    {
        name: "Koala",
        url: "https://cdn.jsdelivr.net/npm/deepar@5.6.5/effects/koala"
    },
    {
        name: "Lion",
        url: "https://cdn.jsdelivr.net/npm/deepar@5.6.5/effects/lion"
    }
];

export interface CreativeRecorderProps {
    onContinueClick: (video: Blob, audio: Blob) => void
}

export default function CreativeRecorder(props: CreativeRecorderProps) {
    const deepAR = useDeepAR("#deepar-screen");
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const audioRecorder = useAudioRecorder();
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioPlayerRef.current = new Audio("/audio/AR_CONTRAST.mp3");
    }, []);

    async function handleVideoStateChange(isStarted: boolean) {
        try {
            if (isStarted) 
                startRecording();
            else 
                finishRecording();
        }
        catch (e) {
            console.error(e);
            alert("Error!");
        }
    }
        
    function handleContinueClick() {
        if (creativeRecorder.video && audioRecorder.audio)
            props.onContinueClick(creativeRecorder.video, audioRecorder.audio);
    }


    function handleEffectChange(effect: EffectItem) {
        deepAR?.switchEffect(effect.url);
    }
    
    return (
        <div style={{ display: "flex" }}>
            <div>
                <StartStopButton
                    onChange={handleVideoStateChange}
                    disabled={!deepAR}
                />
                {" "}
                <button
                    onClick={handleContinueClick}
                    disabled={creativeRecorder.video == null}
                >
                    Continue
                </button>

                <EffectPicker  
                effects={effects}
                onEffectChange={handleEffectChange}
                />
            </div>

            <div>
                <div style={ARScreenStyle} id="deepar-screen"></div>
            </div>
        </div>
    );

    function startRecording() {
        creativeRecorder.finishRecording(),
        audioRecorder.finishRecording()
                
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause()
            audioPlayerRef.current.currentTime = 0;
        }
    }

    function finishRecording() {
        creativeRecorder?.startRecording(),
        audioRecorder.startRecording()
        audioPlayerRef.current?.play();
    }
}