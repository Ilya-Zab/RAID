import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import { RecordingVideo } from "@/Components/CreateVideoTemplate";
import { useState } from "react";
import CreativeRecorder from "@/Components/CreativeRecorder/CreativeRecorder";
// import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";

const CreateVideo = () =>
{
    const [video, setVideo] = useState<Blob | null>(null);
    function handleContinueClick(video: Blob)
    {
        if (video)
            setVideo(video);
    }

    const pageTitle = 'Create video';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main>
                <CreateVideoTemplate />
                <RecordingVideo />
                <CreativeRecorder
                    onContinueClick={handleContinueClick}
                />
            </main>
        </>
    );
}

export default CreateVideo;