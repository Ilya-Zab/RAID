import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";


const CreateVideo = () =>
{
    const pageTitle = 'Preview';
    const title = `It'll never be the <br/>
    same once you 
    <span class='text-gradient'>play Raid</span>.<br/>
    Show how you do it<br/>
    and <span class='text-gradient'>win prizes!</span>`
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main className='bg-gallery'>
                <Title title={title} correctClass={'preview'}/>
                <Creatives img={'vlad-preview.png'}/>
            </main>
        </>
    );
}

export default CreateVideo;