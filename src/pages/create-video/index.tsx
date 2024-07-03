import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { useEffect, useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
import styles from './styles.module.scss';
import { Box } from "@mui/material";
import Modal from "@/Components/Modal/Modal";
import { downloadVideo } from "@/utils";
import useCreateCreative from "@/hooks/useCreateCreative";
import { useVideoFrames } from "@/hooks/useVideoFrames";
import Image from "next/image";

const CreateVideo = () =>
{
    const pageTitle = 'Create video';
    const [video, setVideo] = useState<Blob | null>(null);
    const [step, setStep] = useState<number>(0);
    const [togglePopover, setTogglePopover] = useState(true);
    const { createCreativeAsBlob, success, data, error } = useCreateCreative();
    const [isProcessing, setProcessing] = useState(false);
    const { extractAllFrames, isLoading } = useVideoFrames();
    const [allFrames, setAllFrames] = useState(null);

    useEffect(() =>
    {
        if (!video) return;
        downloadVideo(video, "video.mp4");
        createCreativeAsBlob(video);
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video]);

    function handleContinueClick(video: Blob)
    {
        if (video)
            setVideo(video);
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
        const frames = await extractAllFrames(video);
        setAllFrames(frames);
        nextStep();
        console.log(frames);
    }

    const CurrentTemplate = () =>
    {
        switch (step)
        {
            case 0:
                return <CreateVideoTemplate handleButtonClick={nextStep} />;
            case 1:
                return (
                    <Modal open={togglePopover} handleToggle={handleToggle} >
                        <div>
                            <h3 className={styles.modal__title}>Video Instruction</h3>
                            <div className={styles.modal__scrollbar}>
                                <p className={styles.modal__text}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores ea error incidunt minus provident velit voluptas? Ab enim eveniet labore minus vero? A beatae labore neque porro quas quis repellat.
                                </p>
                            </div>
                        </div>
                    </Modal>
                );
            case 2:
                return <CreativeRecorder onContinueClick={handleContinueClick} onVideoRecorded={handleVideoReady} />;
            case 3:
                return (
                    <Box sx={{
                        backgroundImage: `url(${allFrames[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100vh'
                    }}>
                        {allFrames &&
                            allFrames.map((frame, index) =>
                            {
                                return (
                                    <Image
                                        src={frame}
                                        key={index}
                                        alt={""}
                                        width={50}
                                        height={50}
                                    />
                                )
                            })
                        }
                        <button onClick={nextStep}>
                            Next Step
                        </button>
                    </Box>
                )
            case 4:
                return < p > Oops... You have some trouble with creating a creative: (</p >;
            default:
                return <p>Oops... You have some trouble with creating a creative :(</p>;
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
                            {CurrentTemplate()}
                            {
                                step > 1 &&
                                <button onClick={() => prevStep()}>
                                    prev step
                                </button>
                            }
                            {/* {
                                step > 0 &&
                                <button onClick={() => nextStep()}>
                                    next step
                                </button>
                            } */}
                        </Box>
                    </Box>
                </Box>

            </main>
        </>
    );
}

export default CreateVideo;