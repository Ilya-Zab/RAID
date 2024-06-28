import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { RecordingVideo } from "@/Components/CreateVideoTemplate";
import { useEffect, useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
// import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";
import styles from './styles.module.scss';
import { Box } from "@mui/material";

const CreateVideo = () =>
{
    const [video, setVideo] = useState<Blob | null>(null);
    const [step, setStep] = useState<number | null>(null);
    let currentComponent;


    // useEffect(() =>
    // {
    //     currentComponent = getCurrentComponent(step);
    // }, [step]);

    function handleContinueClick(video: Blob)
    {
        if (video)
            setVideo(video);
    }

    function handleCurrentStep(step: number)
    {
        setStep(step);
    }

    const CurrentTemplate = ({ step }) =>
    {
        {
            switch (step)
            {
                case 1:
                    return <CreateVideoTemplate handleButtonClick={handleCurrentStep} />;
                default:
                    return <CreativeRecorder
                        onContinueClick={handleContinueClick}
                    />;
            }
        }
    }

    const pageTitle = 'Create video';
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
                        <Box className={styles.popup}>
                            <CurrentTemplate step={step} />
                        </Box>
                    </Box>
                </Box>
                {/*<FinallyVideoTemplate/>*/}
            </main>
        </>
    );
}

export default CreateVideo;