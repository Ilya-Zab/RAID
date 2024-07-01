import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { useEffect, useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
import styles from './styles.module.scss';
import { Box } from "@mui/material";
import Modal from "@/Components/Modal/Modal";
import { downloadVideo } from "@/utils";
import useCreateCreative from "@/hooks/useCreateCreative";
import { number } from "zod";

const CreateVideo = () =>
{
    const pageTitle = 'Create video';
    const [video, setVideo] = useState<Blob | null>(null);
    const [step, setStep] = useState<number>(0);
    const [togglePopover, setTogglePopover] = useState(true);
    const { createCreativeAsBlob, success, data, error } = useCreateCreative();
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

    const CurrentTemplate = () =>
    {
        switch (step)
        {
            case 1:
                return (
                    <Modal open={togglePopover} handleToggle={handleToggle}>
                        <div>
                            <h3>asdsad</h3>
                        </div>
                    </Modal>
                );
            case 2:
                return <CreativeRecorder onContinueClick={handleContinueClick} />;
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