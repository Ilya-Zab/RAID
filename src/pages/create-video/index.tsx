import Head from "next/head";
// import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";

const CreateVideo = () => {
    const pageTitle = 'Create video';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main>
                {/*<CreateVideoTemplate/>*/}
                <FinallyVideoTemplate/>
            </main>
        </>
    );
}

export default CreateVideo;