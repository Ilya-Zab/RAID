import Head from "next/head";
import CreateVideoTemplate from "@/Components/CreateVideoTemplate/CreateVideoTemplate";
// import FinallyVideoTemplate from "@/Components/FinallyVideoTemplate/FinallyVideoTemplate";
import styles from './styles.module.scss';
import {Box} from "@mui/material";

const CreateVideo = () =>
{
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
                            <CreateVideoTemplate/>
                        </Box>
                    </Box>
                </Box>
                {/*<FinallyVideoTemplate/>*/}
            </main>
        </>
    );
}

export default CreateVideo;