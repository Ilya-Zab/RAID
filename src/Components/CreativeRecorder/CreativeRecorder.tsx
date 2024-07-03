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
import { useAppDispatch } from "@/hooks/redux";
import { setFrames } from "@/store/slice/creativeFramesSlice";

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
    const [frames, setLocalFrames] = useState(null);
    const dispatch = useAppDispatch();

    const processVideo = async (videoBlob: Blob) =>
    {
        try
        {
            const frames = await videoProcessor.extractAllFrames(videoBlob);
            setLocalFrames(frames);
            dispatch(setFrames(frames));
        } catch (error)
        {
            console.error("Ошибка при извлечении кадров из видео:", error);
        }
    };

    useEffect(() =>
    {
        initializeCreativeRecorder();

        return () =>
        {
            if (deepAR && isInited)
            {
                deepAR.shutdown();
            }
        };
    }, [isInited]);

    useEffect(() =>
    {
        if (!creativeRecorder.video || !audioRecorder.audio || !music)
            return

        videoProcessor.mergeVideoAndAudio(creativeRecorder.video, audioRecorder.audio, music);
        if (!frames)
        {
            processVideo(creativeRecorder.video);
        }

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

    //     <EffectPicker
    //     effects={effects}
    //     onEffectChange={handleEffectChange}
    // />

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            <Box className={styles.CreativeRecorder__buttons}>
                <button
                    onClick={handleContinueClick}
                    disabled={!videoProcessor.output}
                >
                    Download
                </button>
                <StartStopButton
                    onChange={handleVideoStateChange}
                    disabled={!deepAR || !isInited}
                />
                <button
                >
                    REW
                </button>
                <button
                >
                    Sound
                </button>
            </Box>
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