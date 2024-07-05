import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { useCallback, useEffect, useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
import styles from './styles.module.scss';
import { Box, Button } from "@mui/material";
import Modal from "@/Components/Modal/Modal";
import { downloadVideo } from "@/utils";
import { useVideoFrames } from "@/hooks/useVideoFrames";
import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import CreativeSwiper from "@/Components/CreativeSwiper/CreativeSwiper";
import { setLoading } from "@/store/slice/creativeSlice";

const CreateVideo = () =>
{
    const pageTitle = 'Create video';
    const [video, setVideo] = useState<Blob | null>(null);
    const [currentBlobFrame, setCurrentBlobFrame] = useState<Blob | null>(null);
    const [step, setStep] = useState<number>(0);
    const [togglePopover, setTogglePopover] = useState(true);
    const { extractAllFrames, isLoading } = useVideoFrames();
    const [allFrames, setAllFrames] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const raidId = useAppSelector(state => state.raidId.raidId);
    const [cookies] = useCookies(['userToken']);
    const router = useRouter();
    const isCreating = useAppSelector(state => state.creative.isLoading);
    const dispatch = useAppDispatch();

    const getCurrentFrame = (currentFrame: Blob) =>
    {
        if (currentFrame)
        {
            setCurrentBlobFrame(currentFrame);
        }
    }

    useEffect(() =>
    {
        if (!raidId && !cookies.userToken)
        {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raidId, cookies]);

    // downloadVideo(video, "video.mp4");

    function handleContinueClick(video: Blob)
    {
        if (video)
        {
            setVideo(video);
        }
    }

    const handleToggle = () =>
    {
        nextStep();
    }

    function nextStep()
    {
        setStep(prev => prev + 1);
    }

    function prevStep()
    {
        setStep(prev => (prev > 1 ? prev - 1 : 1));
    }

    async function handleVideoReady(video: Blob)
    {
        dispatch(setLoading(true));
        setVideo(video);
        setVideoUrl(URL.createObjectURL(video));
        const frames = await extractAllFrames(video);
        setAllFrames(frames);
        nextStep();
        dispatch(setLoading(false));
    }

    // if (isCreating)
    // {
    //     return <p>Loading...</p>
    // }

    const CurrentTemplate = () =>
    {
        switch (step)
        {
            case 0:
                return <CreateVideoTemplate handleButtonClick={nextStep} />;
            case 1:
                return (
                    <Modal open={togglePopover} handleToggle={handleToggle}>
                        <div>
                            <h3 className={styles.modal__title}>Video Instruction</h3>
                            <div className={styles.modal__scrollbar}>
                                <p className={styles.modal__text}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores ea error
                                    incidunt minus provident velit voluptas? Ab enim eveniet labore minus vero? A beatae
                                    labore neque porro quas quis repellat.
                                </p>
                            </div>
                        </div>
                    </Modal>
                );
            case 2:
                return <CreativeRecorder onContinueClick={handleContinueClick} onVideoRecorded={handleVideoReady} />;
            case 3:
                return (
                    <Box>
                        <video
                            autoPlay
                            loop
                            muted
                            // poster="https://assets.codepen.io/6093409/river.jpg"
                            className={styles.video}
                        >
                            <source
                                src={videoUrl}
                                type="video/mp4"
                            />
                        </video>
                    </Box>
                )
            case 4:
                return <CreativeSwiper data={allFrames} nextStep={nextStep} getCurrentFrame={getCurrentFrame} />
            case 5:
                return <FinallyVideoTemplate video={video} creativeImage={currentBlobFrame && currentBlobFrame} />
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
                <Box className={styles.bg}>
                    <Box className='container container_createVideo'>
                        <h1 className={`text-gradient ${styles.title}`}>
                            #WeFinallyPlayedIt
                        </h1>
                        <Box className={styles.popup} id="pp">
                            {isCreating && <p>Loadgin...</p>}
                            {!isCreating && CurrentTemplate()}
                            {
                                (step > 1 && step < 5) &&
                                <button onClick={() => prevStep()}
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
                            {
                                step == 3 &&
                                <Button
                                    type="button"
                                    variant="contained"
                                    className={`btn-second btn-second-next`}
                                    onClick={() => nextStep()}
                                >
                                    Next
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