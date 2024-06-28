import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";


const CreateVideo = () =>
{
    const pageTitle = 'Gallery';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main className='bg-gallery'>
                <Title/>
                <Creatives />
            </main>
        </>
    );
}

export default CreateVideo;