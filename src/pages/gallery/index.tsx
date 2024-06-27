import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";


const CreateVideo = () =>
{
    const pageTitle = 'Gallery';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main>
                <Creatives />
            </main>
        </>
    );
}

export default CreateVideo;