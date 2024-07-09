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
import { Box, IconButton } from "@mui/material";
import { Loader } from "../Layouts/Loader";
import { useAppDispatch } from "@/hooks/redux";
import { setLoading } from "@/store/slice/creativeSlice";

// div element for displaying video should has fixed size
const musicPath = "/audio/AR_CONTRAST.mp3";
const effects: EffectItem[] = [
    {
        name: "First part mask",
        url: "effects/MASK_1.deepar"
    },
    {
        name: "Second part mask #1",
        url: "effects/MASK_2_(ORC+TATOO).deepar"
    },
    {
        name: "Second part mask #2",
        url: "effects/MASK_3_(Skeleton+eyes).deepar"
    }
];
export interface CreativeRecorderProps
{
    onVideoRecorded: (video: Blob) => void,
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
    }, [isInited, deepAR]);

    useEffect(() =>
    {
        if (!creativeRecorder.video || !audioRecorder.audio || !music)
            return

        videoProcessor.mergeVideoAndAudio(creativeRecorder.video, audioRecorder.audio, music);
        if (!frames)
        {
            setLocalFrames(creativeRecorder.video);
            props.onVideoRecorded(creativeRecorder.video);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function handleEffectChange(effect: EffectItem)
    {
        deepAR?.switchEffect(effect.url);
    }

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            <Box className={styles.CreativeRecorder__buttons}>
                {/* <EffectPicker
                    effects={effects}
                    onEffectChange={handleEffectChange}
                /> */}
                <button onClick={() => handleEffectChange(
                    {
                        name: "First part mask",
                        url: "effects/MASK_1.deepar"
                    }
                )}>Effect 1</button>

                <button onClick={() => handleEffectChange(
                    {
                        name: "Second part mask #1",
                        url: "effects/MASK_2_(ORC+TATOO).deepar"
                    }
                )}>Effect 2</button>

                <button onClick={() => handleEffectChange(
                    {
                        name: "Second part mask #2",
                        url: "effects/MASK_3_(Skeleton+eyes).deepar"
                    }
                )}>Effect 3</button>

                <StartStopButton

                    onChange={handleVideoStateChange}
                    disabled={!deepAR || !isInited}
                />
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
        dispatch(setLoading(true));
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