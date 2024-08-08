import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
// import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
import styles from './styles.module.scss';
import { Box, Button, Switch } from "@mui/material";
import { useVideoFrames } from "@/hooks/useVideoFrames";
import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import CreativeSwiper from "@/Components/CreativeSwiper/CreativeSwiper";
import { setLoading } from "@/store/slice/creativeSlice";
import { Loader } from "@/Components/Layouts/Loader";
import CreativeName from "@/Components/CreativeName/CreativeName";
import ProgressBar from "@/Components/ProgressBar/ProgressBar";
import { downloadVideo } from "@/utils";
import CreateVideoInfo from "@/Components/CreateVideoInfo/CreateVideoInfo";
import { frameType } from "@/types/slices/creativeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CheckVideo from "./CheckVideo";
import axios from "axios";
import { track } from '@vercel/analytics';
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { allowedImageTypes } from "@/utils/creativeConsts";
import { PhotoVideoSwitch } from "@/Components/Layouts/PhotoVideoSwitch";
import Creative from "@/Components/CreativeRecorder/Creative";

const CreateVideo = () =>
{
    const pageTitle = 'Create video';
    const [video, setVideo] = useState<Blob | null>(null);
    const [currentBlobFrame, setCurrentBlobFrame] = useState<frameType | null>(null);
    const [prevStep, setPrevStep] = useState<number>(0);
    const [step, setStep] = useState<number>(0);
    const [progress, setProgress] = useState<number>(30);
    const { extractAllFrames } = useVideoFrames();
    const [allFrames, setAllFrames] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const raidId = useAppSelector(state => state.raidId.raidId);
    const [cookies] = useCookies(['userToken']);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(state => state.creative.isLoading);
    const uploadedVideo = useSelector((state: RootState) => state.video.video);
    const [isPhoto, setPhoto] = useState<boolean>(false);

    function videoPhotoSwitch() { setPhoto(prev => !prev); }

    useEffect(() =>
    {
        if (!raidId && !cookies.userToken) router.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raidId, cookies]);

    const [taskId, setTaskId] = useState(null);

    function changeProgress(progress: number): void { setProgress(progress === 100 ? 30 : progress); }

    const onDownloadClick = useCallback(() =>
    {
        if (videoUrl) downloadVideo(video, "video.mp4");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoUrl, video]);

    const getCurrentFrame = (currentFrame: frameType): void =>
    {
        if (currentFrame) setCurrentBlobFrame(currentFrame);
    }

    function nextStep(prevStep?: number, nextStep?: number)
    {
        if (step === 0) track('Create creative button click.');
        setPrevStep(prevStep ? prevStep : step);
        setStep(prev => nextStep ? nextStep : prev + 1);
        if (step === 4) track('The creative has been uploaded successfully.');
    }

    function previousStep(): void
    {
        setStep(prevStep > -1 ? prevStep : 0);
        setPrevStep(prev => prev ? prev - 1 : 0)
        dispatch(setLoading(false));
    }

    useEffect(() =>
    {
        if (uploadedVideo)
        {
            if (allowedImageTypes.includes(uploadedVideo.type))
            {
                changeProgress(100);
                getBlobImage(uploadedVideo);
                return;
            }
            if ("path" in uploadedVideo)
            {
                const videoSize = uploadedVideo.size / (1024 * 1024);
                if (videoSize > 5)
                {
                    minimizeVideo(uploadedVideo);
                } else
                {
                    const blob = new Blob([uploadedVideo], { type: uploadedVideo.type });
                    uploadVideo(blob);
                }
                return;
            }
            uploadVideo(uploadedVideo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedVideo]);

    function getBlobImage(uploadedVideo)
    {
        let imageBlob;
        const prevStep = "path" in uploadedVideo ? 0 : 2;
        if (uploadedVideo instanceof Blob)
            imageBlob = uploadedVideo;
        else
            imageBlob = new Blob([uploadedVideo], { type: uploadedVideo.type });
        const imageUrl = URL.createObjectURL(imageBlob);
        setCurrentBlobFrame(
            {
                frameBlob: imageBlob,
                frameUrl: imageUrl
            });

        changeProgress(100);
        dispatch(setLoading(false));
        nextStep(prevStep, 5);
    }

    async function minimizeVideo(video)
    {
        const data = new FormData();
        data.append("video", video);
        try
        {
            const resp = await axios.post("https://wefinallyplayedit.com/api/minimizer", data);
            setTaskId(resp.data.data.taskId);
            changeProgress(60);
        } catch (err)
        {
            dispatch(setLoading(false));
            alert('Creative is too big');
            console.error(err);
        }
    }

    async function checkIsTaskCompleted(taskId, clearIntervalFn)
    {
        try
        {
            const res = await axios.get(`https://wefinallyplayedit.com/api/minimizer/${taskId}`);
            if (res.data.data.task.status === 'completed')
            {
                changeProgress(70);
                clearIntervalFn();
                downloadVideoById(taskId);
            }
        } catch (error)
        {
            dispatch(setLoading(false));
            alert('Server error');
            console.error('Ошибка:', error);
        }
    }

    useEffect(() =>
    {
        if (taskId)
        {
            const intervalId = setInterval(() =>
            {
                checkIsTaskCompleted(taskId, () => clearInterval(intervalId));
            }, 2000);

            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);

    async function downloadVideoById(taskId)
    {
        try
        {
            const res = await axios.get(`https://wefinallyplayedit.com/api/minimizer/${taskId}/download`,
                { responseType: 'blob' });
            if (res)
            {
                uploadVideo(res.data);
            }
        } catch (error)
        {
            dispatch(setLoading(false));
            alert('Server error');
            console.error('Ошибка:', error);
        }
    }

    async function uploadVideo(video: Blob)
    {
        changeProgress(90);
        await setVideoUrl(URL.createObjectURL(video));
        setVideo(video);
        const frames = await extractAllFrames(video);
        if (frames.length > 0)
        {
            setAllFrames(frames);
            nextStep(0, 3);
            changeProgress(100);
            dispatch(setLoading(false));
        } else
        {
            dispatch(setLoading(false));
        }
    }

    async function handleVideoReady(video: Blob)
    {
        dispatch(setLoading(true));
        changeProgress(70);
        setVideo(video);
        setVideoUrl(URL.createObjectURL(video));
        const frames = await extractAllFrames(video);
        if (frames.length > 0 && video)
        {
            setAllFrames(frames);
            nextStep();
        } else
        {
            alert('The video is too short, please record it again!');
        }
        dispatch(setLoading(false));
    }

    const CurrentTemplate = () =>
    {
        switch (step)
        {
            case 0:
                return <CreateVideoTemplate handleButtonClick={nextStep} changeProgress={changeProgress} />;
            case 1:
                return <CreateVideoInfo handleToggle={nextStep} handleBack={previousStep} />;
            case 2:
                return <Creative onVideoRecorded={handleVideoReady} onImageReady={getBlobImage} isPhoto={isPhoto} />
            case 3:
                return <CheckVideo videoUrl={videoUrl} onDownload={onDownloadClick} prevStep={previousStep} />;
            case 4:
                return <CreativeSwiper data={allFrames && allFrames} nextStep={nextStep} getCurrentFrame={getCurrentFrame} />;
            case 5:
                return <CreativeName nextStep={nextStep} creativeImage={currentBlobFrame} />;
            case 6:
                return <FinallyVideoTemplate video={video} creativeImage={currentBlobFrame} changeProgress={changeProgress} />;
            default:
                return <CreateVideoTemplate handleButtonClick={nextStep} />;
        }
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main>
                <Box className={(step <= 1) ? styles.bg : (step === 6) ? styles.bg3 : styles.bg2}>
                    <Box className='container container_createVideo'>
                        {(step !== 0 && step !== 1) && <ProgressBar value={step} />}
                        <h1 className={`text-gradient ${styles.title}`}>
                            #WeFinallyPlayedIt
                        </h1>
                        <Box className={styles.popup} id="pp">
                            {CurrentTemplate()}
                            {isCreating && <Loader className={styles.popup__loader} color="white" size={100} progress={progress} />}
                            {
                                (step > 0 && step < 6) &&
                                <button onClick={previousStep}
                                    className={`${styles.button} ${styles['button-prev']}`}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_b_616_77)">
                                            <rect width="40" height="40" rx="20" fill="#5D5D5D" fillOpacity="0.3" />
                                            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white" />
                                            <path
                                                d="M23.4796 26.1453C23.6733 26.3391 23.7822 26.6018 23.7822 26.8758C23.7822 27.1498 23.6733 27.4125 23.4796 27.6063C23.2859 27.8 23.0231 27.9089 22.7491 27.9089C22.4751 27.9089 22.2124 27.8 22.0186 27.6063L15.1436 20.7313C15.0475 20.6355 14.9712 20.5216 14.9192 20.3963C14.8671 20.2709 14.8403 20.1365 14.8403 20.0008C14.8403 19.8651 14.8671 19.7307 14.9192 19.6053C14.9712 19.48 15.0475 19.3661 15.1436 19.2703L22.0186 12.3953C22.2124 12.2016 22.4751 12.0928 22.7491 12.0928C23.0231 12.0928 23.2859 12.2016 23.4796 12.3953C23.6733 12.5891 23.7822 12.8518 23.7822 13.1258C23.7822 13.3998 23.6733 13.6625 23.4796 13.8563L17.3359 20L23.4796 26.1453Z"
                                                fill="white" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_b_616_77" x="-24" y="-24" width="88" height="88"
                                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12" />
                                                <feComposite in2="SourceAlpha" operator="in"
                                                    result="effect1_backgroundBlur_616_77" />
                                                <feBlend mode="normal" in="SourceGraphic"
                                                    in2="effect1_backgroundBlur_616_77" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </button>
                            }
                            {step === 2 &&
                                <PhotoVideoSwitch
                                    className={`${styles.switch}`}
                                    isPhoto={isPhoto}
                                    onChange={videoPhotoSwitch}
                                />
                            }
                            {
                                step == 3 &&
                                <Button
                                    type="button"
                                    variant="contained"
                                    className={`btn-second btn-second-next`}
                                    onClick={() => nextStep()}
                                    disabled={isCreating}
                                >
                                    {isCreating ? "Wait.." : "Next"}
                                </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </main>
        </>
    );
}

export default CreateVideo;