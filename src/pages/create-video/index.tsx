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

    function handleContinueClick(video: Blob)
    {
        if (video)
            setVideo(video);
    }

    function nextStep(step: number)
    {
        setStep(step);
    }

    function prevStep(step: number)
    {
        setStep(step);
    }

    // const CurrentTemplate = (step) =>
    // {
    //     {
    //         switch (step)
    //         {
    //             case 1:
    //                 return <CreateVideoTemplate handleButtonClick={nextStep} />;
    //             case 2:
    //                 return <div></div>
    //             default:
    //                 return <CreativeRecorder
    //                     onContinueClick={handleContinueClick}
    //                 />;
    //         }
    //     }
    // }

    // function changeTemplate(step)
    // {
    //     switch (step)
    //     {
    //         case 1:
    //             // return <CreateVideoTemplate handleButtonClick={nextStep} />;
    //             return <div>First second</div>;
    //         case 2:
    //             return <div>Third second</div>;
    //         default:
    //             // return <CreativeRecorder onContinueClick={handleContinueClick} />;
    //             return <div>First step</div>;
    //     }
    // }

    const CurrentTemplate = ({ step, nextStep, handleContinueClick }) =>
    {
        switch (step)
        {
            case 1:
                return <CreativeRecorder onContinueClick={handleContinueClick} />;
            case 2:
                return <div></div>;
            default:
                return <CreateVideoTemplate handleButtonClick={nextStep} />;
        }
    };

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
                            {/* <button onClick={() => prevStep(0)}>
                                prev step
                            </button>
                            <button onClick={() => prevStep(1)}>
                                next step
                            </button> */}
                            {/* <CurrentTemplate step={step} /> */}
                            {/* {CurrentTemplate(step)} */}
                            {/* <CreateVideoTemplate /> */}
                            <CurrentTemplate step={step} nextStep={nextStep} handleContinueClick={handleContinueClick} />
                        </Box>
                    </Box>
                </Box>

            </main>
        </>
    );
}

export default CreateVideo;