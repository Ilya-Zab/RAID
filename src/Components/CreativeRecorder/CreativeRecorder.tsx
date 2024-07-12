"use client"
import useDeepAR from "../../hooks/useDeepAR";
import useCreativeRecorder from "../../hooks/useCreativeRecorder";
import { useEffect, useRef, useState } from "react";
import StartStopButton from "./StartStopButton";
import { EffectItem, EffectPicker } from "./EffectPicker";
import useVideoProcessor from "@/hooks/useVideoProcessor";
import axios from "axios";
import styles from './styles.module.scss';
import { Box } from "@mui/material";
import { useAppDispatch } from "@/hooks/redux";
import { setLoading } from "@/store/slice/creativeSlice";
import { RootState, AppDispatch } from '../../store/store';
import { togglePlay } from '../../store/slice/audioSlice';
import { useSelector } from "react-redux";

const musicPath = "/audio/AR_CONTRAST.mp3";

const orcEffects: EffectItem[] = [
    {
        name: "Orc + tatoo",
        src: 'PICKER4.png',
        url: "effects/ORC_BG+TATOO.deepar"
    },
    {
        name: "Orc + EYES",
        src: 'PICKER7.png',
        url: "effects/ORC_BG+EYES.deepar"
    },
    {
        name: "Orc + orc head",
        src: 'PICKER8.png',
        url: "effects/ORC_BG+ORC_HEAD.deepar"
    },
    {
        name: "Orc + skeleton head",
        src: 'PICKER3.png',
        url: "effects/ORC_BG+SKELETON_HEAD.deepar"
    },
]

const skeletEffects: EffectItem[] = [
    {
        name: "Skeleton + tatoo",
        src: 'PICKER4.png',
        url: "/effects/SKELETON_BG_TATOO.deepar"
    },
    {
        name: "Skeleton + eyes",
        src: 'PICKER7.png',
        url: "/effects/SKELETON+EYES.deepar"
    },
    {
        name: "Skeleton + orc head",
        src: 'PICKER8.png',
        url: "/effects/SKELETON_BG+ORC_HEAD.deepar"
    },
    {
        name: "Skeleton + skeleton head",
        src: 'PICKER3.png',
        url: "/effects/SKELETON_BG+SKELETON_HEAD.deepar"
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

const creativeRecordingStartedEvent = new Event("creative-recording-started", { bubbles: true });

export interface CreativeRecorderProps
{
    onVideoRecorded: (video: Blob) => void,
}

export default function CreativeRecorder(props: CreativeRecorderProps)
{
    const deepAR = useDeepAR("#deepar-screen");
    const [isInited, setIsInited] = useState<boolean>(false);
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const videoProcessor = useVideoProcessor();
    const [music, setMusic] = useState<Blob | null>(null);
    const [currentEffects, setCurrentEffects] = useState(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [frames, setLocalFrames] = useState(null);
    const dispatch = useAppDispatch();
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const abortController = useRef(new AbortController());
    const isNavbarMusicPlaying = useSelector((state: RootState) => state.audio.isPlaying);

    useEffect(() =>
    {
        initializeCreativeRecorder();

        return () =>
        {
            abortController.current.abort();

            if (deepAR && isInited)
            {
                deepAR.shutdown();
            }

            if (timerRef.current)
            {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (audioPlayerRef.current)
            {
                audioPlayerRef.current.pause();
                audioPlayerRef.current.currentTime = 0;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInited, deepAR]);

    useEffect(() =>
    {
        if (!creativeRecorder.video || !music)
            return

        videoProcessor.mergeVideoAndAudio(creativeRecorder.video, music);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creativeRecorder.isRecording, music]);

    useEffect(() =>
    {
        if (!videoProcessor.output)
            return;

        if (!frames)
        {
            setLocalFrames(videoProcessor.output);
            props.onVideoRecorded(videoProcessor.output);
        }
    }, [videoProcessor.output]);

    async function handleVideoStateChange(isStarted: boolean)
    {
        try
        {
            if (isStarted)
            {
                finishRecording();
            } else
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
        if (recordingTime === 40)
        {
            finishRecording();
            dispatch(setLoading(true));
        }
        if (recordingTime === 8)
        {
            creativeRecorder.switchEffect(currentEffects[0].data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordingTime]);

    function handleEffectChange(effect: EffectItem)
    {
        deepAR?.switchEffect(effect.url);
    }

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            {isInited &&
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
            }
        </Box>
    );

    function startRecording()
    {
        // stop background music that can be playing after click button in the site navbar 
        if (isNavbarMusicPlaying)
            dispatch(togglePlay());

        creativeRecorder?.startRecording();
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
        creativeRecorder.finishRecording();
        if (audioPlayerRef.current)
        {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
        }
        if (timerRef.current)
        {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        dispatch(setLoading(true));
    }

    async function initializeCreativeRecorder()
    {
        const music = await axios.get(musicPath, { responseType: "blob" })
            .then(response => response.data);

        audioPlayerRef.current = new Audio(musicPath);
        setMusic(music);

        const videoGrants = await creativeRecorder.getPermissions();

        setIsInited(videoGrants);
    }
}