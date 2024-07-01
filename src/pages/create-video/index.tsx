import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { useEffect, useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
// import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";
import styles from './styles.module.scss';
import { Box } from "@mui/material";
import Modal from "@/Components/Modal/Modal";

const CreateVideo = () =>
{
    const pageTitle = 'Create video';
    const [video, setVideo] = useState<Blob | null>(null);
    const [step, setStep] = useState<number>(0);
    const [togglePopover, setTogglePopover] = useState(true);

    useEffect(() =>
    {
        if (!video) return;

        // functionality of the posting video into WordPress was temporary blocked for correct test deployment purposes
        downloadVideo(video, "video.mp4");
        return;

        axios.post("/api/video-uploader", { video })
            .then(response =>
            {
                setResult(response.data);
                setIsUploaded(true);
            })
            .catch(err => setResult(err.response));
    }, [video]);

    const handleToggle = () =>
    {
        nextStep();
    }

    function handleContinueClick(video: Blob)
    {
        if (video)
            setVideo(video);
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
                        <Box className={styles.popup}>
                            {/* <CurrentTemplate step={step} /> */}
                            {/* {CurrentTemplate(step)} */}
                            {/* <CreateVideoTemplate /> */}
                            <CurrentTemplate step={step} nextStep={nextStep} handleContinueClick={handleContinueClick} />
                            {
                                step > 1 &&
                                <button onClick={() => prevStep()}>
                                    prev step
                                </button>
                            }
                            {
                                step === 1 ? null : step > 0 &&
									<button onClick={() => nextStep()}>
										next step
									</button>
                            }
                        </Box>
                    </Box>
                </Box>

            </main>
        </>
    );
}

export default CreateVideo;