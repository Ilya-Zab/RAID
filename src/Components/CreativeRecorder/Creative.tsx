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

const musicPath = "/audio/AR_CONTRAST_sad_piano_Break_v04.1.mp3";

const orcEffects: EffectItem[] = [
    {
        name: "Orc + tatoo",
        src: 'PICKER7.png',
        url: "effects/ORC_BG+TATOO.deepar"
    },
    {
        name: "Orc + EYES",
        src: 'PICKER8.png',
        url: "effects/ORC_BG+EYES.deepar"
    },
    {
        name: "Orc + orc head",
        src: 'PICKER3.png',
        url: "effects/ORC_BG+ORC_HEAD.deepar"
    },
    {
        name: "Orc + skeleton head",
        src: 'PICKER4.png',
        url: "effects/ORC_BG+SKELETON_HEAD.deepar"
    },
]

const skeletEffects: EffectItem[] = [
    {
        name: "Skeleton + tatoo",
        src: 'PICKER7.png',
        url: "/effects/SKELETON_BG_TATOO.deepar"
    },
    {
        name: "Skeleton + eyes",
        src: 'PICKER8.png',
        url: "/effects/SKELETON+EYES.deepar"
    },
    {
        name: "Skeleton + orc head",
        src: 'PICKER3.png',
        url: "/effects/SKELETON_BG+ORC_HEAD.deepar"
    },
    {
        name: "Skeleton + skeleton head",
        src: 'PICKER4.png',
        url: "/effects/SKELETON_BG+SKELETON_HEAD.deepar"
    },
]

const skeletPhotoEffects: EffectItem[] = [
    {
        name: "Skeleton + tatoo",
        src: 'PICKER7.png',
        url: "/effects/MASK+TEXT.deepar"
    },
    {
        name: "Skeleton + eyes",
        src: 'PICKER8.png',
        url: "/effects/EYES+TEXT.deepar"
    },
    {
        name: "Skeleton + orc head",
        src: 'PICKER3.png',
        url: "/effects/ORC_HEAD+TEXT.deepar"
    },
    {
        name: "Skeleton + skeleton head",
        src: 'PICKER4.png',
        url: "/effects/SKELETON_HEAD+TEXT.deepar"
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
    onVideoRecorded: (video: Blob) => void;
    onImageReady: (video: Blob) => void;
    isPhoto: boolean;
}

export default function Creative<CreativeRecorderProps>({ onVideoRecorded, onImageReady, isPhoto })
{
    const dispatch = useAppDispatch();
    const deepAR = useDeepAR("#deepar-screen");
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const videoProcessor = useVideoProcessor();
    const [isInited, setIsInited] = useState<boolean>(false);
    const [music, setMusic] = useState<Blob | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const isNavbarMusicPlaying = useSelector((state: RootState) => state.audio.isPlaying);
    const [currentEffects, setCurrentEffects] = useState(null);
    const [frames, setLocalFrames] = useState(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const effectsTimer = useRef<NodeJS.Timeout | null>(null);
    const [isSwitchingEffect, setSwitchingEffect] = useState<boolean>(false);

    useEffect(() =>
    {
        return () =>
        {
            if (deepAR) deepAR.shutdown();
            setCurrentEffects(isPhoto ? skeletPhotoEffects : orcEffects);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() =>
    {
        setCurrentEffects(isPhoto ? skeletPhotoEffects : orcEffects);
        handleEffectChange(isPhoto ? skeletPhotoEffects[0] : effects[0]);
    }, [isPhoto])

    useEffect(() =>
    {
        initializeCreativeRecorder();

        return () =>
        {
            if (deepAR) deepAR.shutdown();

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
            onVideoRecorded(videoProcessor.output);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoProcessor.output]);

    async function handleVideoStateChange(isStarted: boolean)
    {
        try
        {
            if (isStarted) finishRecording();
            else startRecording();
        }
        catch (e)
        {
            console.error(e);
            alert("Error!");
        }
    }

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
        if (recordingTime === 41)
        {
            finishRecording();
            dispatch(setLoading(true));
        }
        if (recordingTime === 5)
        {
            creativeRecorder.switchEffect(currentEffects[0].data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordingTime]);

    function handleEffectChange(effect: EffectItem)
    {
        if (deepAR)
        {
            setSwitchingEffect(true);

            if (effectsTimer.current)
            {
                clearTimeout(effectsTimer.current);
            }

            effectsTimer.current = setTimeout(() =>
            {
                deepAR.switchEffect(effect.url);
                setSwitchingEffect(false);
            }, 300);
        }
    }


    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            {isInited &&
                <Box className={styles.CreativeRecorder__buttons}>
                    {(isPhoto || recordingTime > 5) &&
                        < EffectPicker
                            effects={currentEffects}
                            onEffectChange={handleEffectChange}
                            orientation={'vertical'}
                            radioName={'effects'}
                        />
                    }
                    {(!isPhoto && recordingTime < 1) &&
                        <EffectPicker
                            effects={effects}
                            onEffectChange={firstEffectChange}
                            orientation={'horizontal'}
                        />
                    }
                    {!isPhoto ?
                        <StartStopButton
                            onChange={handleVideoStateChange}
                            disabled={!deepAR || !isInited}
                        />
                        :
                        <button
                            onClick={handlePhotoClick}
                            className={`${styles.button} ${styles['button-stop']} ${styles['button-photo']}`}
                        >
                            <span />
                        </button>}
                </Box>
            }
        </Box>
    );

    async function handlePhotoClick()
    {
        const dataUrl = await deepAR.takeScreenshot();
        const blob = convertDataUrlToBlob(dataUrl);
        if (blob) onImageReady(blob);
    }

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
        if (!isPhoto)
        {
            const music = await axios.get(musicPath, { responseType: "blob" })
                .then(response => response.data);

            audioPlayerRef.current = new Audio(musicPath);
            setMusic(music);
        }

        const videoGrants = await creativeRecorder.getPermissions();
        setIsInited(videoGrants);
    }
}

function convertDataUrlToBlob(dataUrl: string): Blob
{
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--)
    {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}
