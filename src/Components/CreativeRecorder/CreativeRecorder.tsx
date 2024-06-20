"use client"

import useDeepAR from "../../hooks/useDeepAR";
import useCreativeRecorder from "../../hooks/useCreativeRecorder";
import { useEffect, useRef } from "react";
import StartStopButton from "./StartStopButton";
import { EffectItem, EffectPicker } from "./EffectPicker";

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
    onContinueClick: (video: Blob) => void
}

export default function CreativeRecorder(props: CreativeRecorderProps) {
    const deepAR = useDeepAR("#deepar-screen");
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioPlayerRef.current = new Audio("/audio/AR_CONTRAST.mp3");
    }, []);

    useEffect(() => {
        if (!creativeRecorder) return;
        creativeRecorder.events.addEventListener("recordingStarted", handleRecordingStarted);
        creativeRecorder.events.addEventListener("recordingFinished", handleRecordingFinished);
    }, [creativeRecorder]);
    
    function handleRecordingStarted() {
        audioPlayerRef.current?.play()
    }

    function handleRecordingFinished() {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause()
            audioPlayerRef.current.currentTime = 0;
        }
    }

    async function handleVideoStateChange(isStarted: boolean) {
        try {
            if (creativeRecorder?.getIsRecording()) {
                await creativeRecorder.finishRecording();
            }
            else {
                await creativeRecorder?.startRecording();
            }
        }
        catch (e) {
            console.error(e);
            alert("Error!");
        }
    }
        
    function handleContinueClick() {
        const video = creativeRecorder?.getVideo();
        if (video)
            props.onContinueClick(video);
    }


    function handleEffectChange(effect: EffectItem) {
        creativeRecorder?.changeEffect(effect.url);
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
                    disabled={!creativeRecorder?.getVideo()}
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
    )
}