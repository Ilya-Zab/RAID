import { SocialShare } from "@/Components/SocialShare";
import { IconButton } from "@mui/material";
import Head from "next/head";
const Share = () =>
{
    const pageTitle = 'Create video';
    return (
        <>
            <Head>
                <title>{"Share"}</title>
                <meta name="description" content={`This is Share`} />
            </Head>
            <main>
                <h1>Share</h1>
                <SocialShare />
            </main>
        </>
    );
}

export default Share;