"use client"

import useDeepAR from "../../hooks/useDeepAR";
import useCreativeRecorder from "../../hooks/useCreativeRecorder";
import { useEffect, useRef, useState } from "react";
import StartStopButton from "./StartStopButton";
import { EffectItem, EffectPicker } from "./EffectPicker";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import useVideoProcessor from "@/hooks/useVideoProcessor";
import axios from "axios";
import styles from './styles.module.scss';
import { Box } from "@mui/material";

// div element for displaying video should has fixed size
const musicPath = "/audio/AR_CONTRAST.mp3";
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

export interface CreativeRecorderProps
{
    onContinueClick: (video: Blob) => void
}

export default function CreativeRecorder(props: CreativeRecorderProps)
{
    const deepAR = useDeepAR("#deepar-screen");
    const [isInited, setIsInited] = useState<boolean>(false);
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const audioRecorder = useAudioRecorder();
    const videoProcessor = useVideoProcessor();
    const [music, setMusic] = useState<Blob | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() =>
    {
        initializeCreativeRecorder();
    }, []);

    useEffect(() =>
    {
        if (!creativeRecorder.video || !audioRecorder.audio || !music)
            return

        videoProcessor.mergeVideoAndAudio(creativeRecorder.video, audioRecorder.audio, music);
    }, [creativeRecorder.isRecording, audioRecorder.finishRecording, music]);

    async function handleVideoStateChange(isStarted: boolean)
    {
        try
        {
            if (isStarted)
                finishRecording();
            else
                startRecording();
        }
        catch (e)
        {
            console.error(e);
            alert("Error!");
        }
    }

    function handleContinueClick()
    {
        if (videoProcessor.output)
            props.onContinueClick(videoProcessor.output);
    }


    function handleEffectChange(effect: EffectItem)
    {
        deepAR?.switchEffect(effect.url);
    }

    // <StartStopButton
    //                 onChange={handleVideoStateChange}
    //                 disabled={!deepAR || !isInited}
    //             />

    //     <EffectPicker
    //     effects={effects}
    //     onEffectChange={handleEffectChange}
    // />

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            <button
                onClick={handleContinueClick}
                disabled={!videoProcessor.output}
            >
                Continue
            </button>
        </Box>
    );

    function startRecording()
    {
        creativeRecorder?.startRecording(),
            audioRecorder.startRecording()
        audioPlayerRef.current?.play();
    }

    function finishRecording()
    {
        audioRecorder.finishRecording();
        creativeRecorder.finishRecording();

        if (audioPlayerRef.current)
        {
            audioPlayerRef.current.pause()
            audioPlayerRef.current.currentTime = 0;
        }
    }

    async function initializeCreativeRecorder()
    {
        const music = await axios.get(musicPath, { responseType: "blob" })
            .then(response => response.data);

        audioPlayerRef.current = new Audio(musicPath);
        setMusic(music);

        const videoGrants = await creativeRecorder.getPermissions();
        const audioGrants = await audioRecorder.getPermissions();

        setIsInited(videoGrants && audioGrants);
    }
}







// used to test recorded videos
function downloadVideo(video: Blob, videoName: string)
{
    const url = URL.createObjectURL(video);
    const a: any = document.createElement("a");

    a.href = url;
    a.download = videoName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

