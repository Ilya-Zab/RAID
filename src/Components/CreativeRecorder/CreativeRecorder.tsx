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

const orcEffects: EffectItem[] = [
    {
        name: "Orc + EYES",
        src: 'PICKER1.png',
        url: "effects/ORC_BG+EYES.deepar"
    },
    {
        name: "Orc + orc head",
        src: 'PICKER1.png',
        url: "effects/ORC_BG+ORC_HEAD.deepar"
    },
    {
        name: "Orc + skeleton head",
        src: 'PICKER1.png',
        url: "effects/ORC_BG+SKELETON_HEAD.deepar"
    },
    {
        name: "Orc + tatoo",
        src: 'PICKER1.png',
        url: "effects/ORC_BG+TATOO.deepar"
    },
]

const skeletEffects: EffectItem[] = [
    {
        name: "Skeleton + eyes",
        src: 'PICKER2.png',
        url: "effects/SKELETON+EYES.deepar"
    },
    {
        name: "Skeleton + orc head",
        src: 'PICKER2.png',
        url: "effects/SKELETON_BG+ORC_HEAD.deepar"
    },
    {
        name: "Skeleton + skeleton head",
        src: 'PICKER2.png',
        url: "effects/SKELETON_BG+SKELETON_HEAD.deepar"
    },
    {
        name: "Skeleton + tatoo",
        src: 'PICKER2.png',
        url: "effects/SKELETON_BG_TATOO.deepar"
    },
]

const effects: EffectItem[] = [
    {
        name: "orc",
        src: 'PICKER1.png',
        url: "effects/MASK_1.deepar"
    },
    {
        name: "skelet",
        src: 'PICKER2.png',
        url: "effects/MASK_1.deepar"
    },
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
    const [isOrc, setOrc] = useState<boolean>(null);
    const [currentEffects, setCurrentEffects] = useState(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [frames, setLocalFrames] = useState(null);
    const dispatch = useAppDispatch();

    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() =>
    {
        initializeCreativeRecorder();

        return () =>
        {
            if (deepAR && isInited)
            {
                deepAR.shutdown();
            }

            if (timerRef.current)
            {
                clearInterval(timerRef.current);
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

    useEffect(() =>
    {
        setCurrentEffects(orcEffects);
    }, []);

    function firstEffectChange(effect: EffectItem)
    {
        if (effect.name === 'orc')
        {
            setCurrentEffects(orcEffects);
        } else if (effect.name === 'skelet')
        {
            setCurrentEffects(skeletEffects);
        }
    }

    useEffect(() =>
    {
        if (recordingTime !== 6) return;
        deepAR?.switchEffect(currentEffects[0].url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordingTime]);



    function handleEffectChange(effect: EffectItem)
    {
        deepAR?.switchEffect(effect.url);
    }

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            <Box className={styles.CreativeRecorder__buttons}>
                {recordingTime < 1 &&
                    <EffectPicker
                        effects={effects}
                        onEffectChange={firstEffectChange}
                        orientation={'horizontal'}
                    />
                }

                {recordingTime > 7 &&
                    < EffectPicker
                        effects={currentEffects}
                        onEffectChange={handleEffectChange}
                        orientation={'vertical'}
                    />
                }
                <StartStopButton
                    onChange={handleVideoStateChange}
                    disabled={!deepAR || !isInited}
                />
            </Box>
        </Box>
    );

    function startRecording()
    {
        creativeRecorder?.startRecording();
        audioRecorder.startRecording();
        audioPlayerRef.current?.play();

        setRecordingTime(0);
        if (timerRef.current)
        {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() =>
        {
            setRecordingTime(prev => prev + 1);
        }, 1000);
    }

    function finishRecording()
    {
        audioRecorder.finishRecording();
        creativeRecorder.finishRecording();
        if (audioPlayerRef.current)
        {
            dispatch(setLoading(true));
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
        }
        if (timerRef.current)
        {
            clearInterval(timerRef.current);
            timerRef.current = null;
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