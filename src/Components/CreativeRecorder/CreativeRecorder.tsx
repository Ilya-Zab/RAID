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
    const [soundRecording,setSoundRecording] = useState<boolean>(false);
    const deepAR = useDeepAR("#deepar-screen");
    const [isInited, setIsInited] = useState<boolean>(false);
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const audioRecorder = useAudioRecorder();
    const videoProcessor = useVideoProcessor();
    const [music, setMusic] = useState<Blob | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [frames, setLocalFrames] = useState(null);
    const dispatch = useAppDispatch();

    const handlerClickSoundRecording = () => {
        setSoundRecording(!soundRecording);
    }

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
                <IconButton
                    onClick={handleContinueClick}
                    disabled={!videoProcessor.output}
                    className={`${styles.button} ${styles['button-download']}`}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_184_739)">
                            <rect width="50" height="50" rx="25" fill="url(#paint0_linear_184_739)" fillOpacity="0.4"/>
                            <rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white"/>
                            <path d="M19.3657 24.2253C19.2079 24.0736 19.1192 23.8678 19.1192 23.6532C19.1192 23.4386 19.2079 23.2328 19.3657 23.0811C19.5235 22.9293 19.7375 22.8441 19.9607 22.8441C20.1839 22.8441 20.3979 22.9293 20.5557 23.0811L24.16 26.5481V18.8077C24.16 18.5935 24.2485 18.388 24.406 18.2366C24.5636 18.0851 24.7772 18 25 18C25.2228 18 25.4364 18.0851 25.594 18.2366C25.7515 18.388 25.84 18.5935 25.84 18.8077V26.5481L29.4457 23.0804C29.6035 22.9287 29.8175 22.8434 30.0407 22.8434C30.2639 22.8434 30.4779 22.9287 30.6357 23.0804C30.7935 23.2321 30.8822 23.4379 30.8822 23.6525C30.8822 23.8671 30.7935 24.0729 30.6357 24.2246L25.5957 29.0708C25.5177 29.1461 25.4249 29.2058 25.3228 29.2466C25.2207 29.2873 25.1113 29.3083 25.0007 29.3083C24.8901 29.3083 24.7807 29.2873 24.6786 29.2466C24.5765 29.2058 24.4837 29.1461 24.4057 29.0708L19.3657 24.2253ZM31.16 30.3846H18.84C18.6172 30.3846 18.4036 30.4697 18.246 30.6212C18.0885 30.7727 18 30.9781 18 31.1923C18 31.4065 18.0885 31.612 18.246 31.7634C18.4036 31.9149 18.6172 32 18.84 32H31.16C31.3828 32 31.5964 31.9149 31.754 31.7634C31.9115 31.612 32 31.4065 32 31.1923C32 30.9781 31.9115 30.7727 31.754 30.6212C31.5964 30.4697 31.3828 30.3846 31.16 30.3846Z" fill="white"/>
                        </g>
                        <defs>
                            <filter id="filter0_b_184_739" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_184_739"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_184_739" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_184_739" x1="33.9907" y1="-23.0556" x2="71.0516" y2="1.76567" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00DED4"/>
                                <stop offset="1" stopColor="#0292BF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </IconButton>
                <StartStopButton
                    onChange={handleVideoStateChange}
                    disabled={!deepAR || !isInited}
                />
                <IconButton className={`${styles.button} ${styles['button-rew']}`}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_586_1694)">
                            <rect width="50" height="50" rx="25" fill="url(#paint0_linear_586_1694)" fillOpacity="0.4"/>
                            <rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white"/>
                        </g>
                        <path d="M14.6087 29V21.7273H17.478C18.0272 21.7273 18.496 21.8255 18.8842 22.022C19.2749 22.2161 19.572 22.492 19.7756 22.8494C19.9815 23.2045 20.0845 23.6224 20.0845 24.103C20.0845 24.5859 19.9804 25.0014 19.772 25.3494C19.5637 25.6951 19.2618 25.9602 18.8665 26.1449C18.4735 26.3295 17.9976 26.4219 17.4389 26.4219H15.5178V25.1861H17.1903C17.4839 25.1861 17.7277 25.1458 17.9219 25.0653C18.116 24.9848 18.2604 24.8641 18.3551 24.7031C18.4522 24.5421 18.5007 24.3421 18.5007 24.103C18.5007 23.8615 18.4522 23.6579 18.3551 23.4922C18.2604 23.3265 18.1148 23.201 17.9183 23.1158C17.7242 23.0282 17.4792 22.9844 17.1832 22.9844H16.1463V29H14.6087ZM18.5362 25.6903L20.3438 29H18.6463L16.8778 25.6903H18.5362ZM21.1712 29V21.7273H26.0717V22.995H22.7088V24.728H25.8196V25.9957H22.7088V27.7322H26.0859V29H21.1712ZM28.9313 29L26.8503 21.7273H28.53L29.7338 26.7805H29.7942L31.1223 21.7273H32.5605L33.8851 26.7912H33.949L35.1529 21.7273H36.8326L34.7516 29H33.253L31.8681 24.245H31.8113L30.4299 29H28.9313Z" fill="#F1F1F1"/>
                        <defs>
                            <filter id="filter0_b_586_1694" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_586_1694"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_586_1694" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_586_1694" x1="33.9907" y1="-23.0556" x2="71.0516" y2="1.76567" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00DED4"/>
                                <stop offset="1" stopColor="#0292BF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </IconButton>
                <IconButton className={`${styles.button} ${styles['button-sound']}`} onClick={handlerClickSoundRecording}>
                    {soundRecording ?
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_40_2080)">
                                <rect width="40" height="40" rx="20" fill="#5D5D5D" fillOpacity="0.3"/>
                                <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white"/>
                                <path
                                    d="M27.7561 18.0093C29.4512 19.9625 29.6906 22.562 28.0781 24.8623M22.2453 13.3542L16.6504 17.7148H10.833V23.9931L16.6504 23.9916L22.2453 28.3542V13.3542Z"
                                    stroke="#F1F1F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <filter id="filter0_b_40_2080" x="-24" y="-23.1458" width="88" height="88"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                                    <feComposite in2="SourceAlpha" operator="in"
                                                 result="effect1_backgroundBlur_40_2080"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_40_2080"
                                             result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                        :
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_40_2080)">
                                <rect width="40" height="40" rx="20" fill="#5D5D5D" fillOpacity="0.3"/>
                                <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white"/>
                                <path
                                    d="M30.9647 17.1554L28.2235 19.8966M28.2235 19.8966L25.4824 22.6378M28.2235 19.8966L30.9647 22.6378M28.2235 19.8966L25.4824 17.1554M20.0196 12.5L14.689 16.8608H9.03516V23.1392L14.689 23.1376L20.0196 27.5V12.5Z"
                                    stroke="#F1F1F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <filter id="filter0_b_40_2080" x="-24" y="-24" width="88" height="88"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                                    <feComposite in2="SourceAlpha" operator="in"
                                                 result="effect1_backgroundBlur_40_2080"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_40_2080"
                                             result="shape"/>
                                </filter>
                            </defs>
                        </svg>

                    }
                </IconButton>
            </Box>
        </Box>
    );

    function startRecording() {
        creativeRecorder?.startRecording(),
            audioRecorder.startRecording()
        audioPlayerRef.current?.play();
    }

    function finishRecording() {
        audioRecorder.finishRecording();
        creativeRecorder.finishRecording();

        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause()
            audioPlayerRef.current.currentTime = 0;
        }
    }

    async function initializeCreativeRecorder() {
        const music = await axios.get(musicPath, {responseType: "blob"})
            .then(response => response.data);

        audioPlayerRef.current = new Audio(musicPath);
        setMusic(music);

        const videoGrants = await creativeRecorder.getPermissions();
        const audioGrants = await audioRecorder.getPermissions();

        setIsInited(videoGrants && audioGrants);
    }
}