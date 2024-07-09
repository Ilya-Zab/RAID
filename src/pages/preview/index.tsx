import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";
import Image from "next/image";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import React from "react";


const CreateVideo = () =>
{
    const pageTitle = 'Preview';
    const title = `It'll never be the <br/>
    same once you 
    <span class='text-gradient'>play Raid</span>.<br/>
    Show how you do it<br/>
    and <span class='text-gradient'>win prizes!</span>`;
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main className='bg-gallery'>
                <Title title={title} correctClass={'preview'}/>
                <Creatives>
                    <Image
                        src='/images/vlad-preview.png'
                        alt="vlad"
                        width={635}
                        height={804}
                        className={`${styles['creatives-section__img']} ${styles['creatives-section__img_preview']}`}
                    />
                </Creatives>
            </main>
        </>
    );
}

export default CreateVideo;