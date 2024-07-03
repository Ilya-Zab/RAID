import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import Image from "next/image";
import React from "react";


const CreateVideo = () =>
{
    const pageTitle = 'Gallery';
    const title = ` It&rsquo;ll never be the<br/>
                same once you
                <span class='text-gradient'> play<br/>Raid</span>
                . Show how you<br/>
                do it and
                <span class='text-gradient'> win prizes!</span>`
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            < className='bg-gallery'>
                <Title title={title} correctClass={'gallery'}/>
                <Creatives img={'vlad-gallery.png'}>
                    <Image
                        ref={beforeRef}
                        src='/images/vlad-gallery.png'
                        alt="vlad"
                        width={635}
                        height={804}
                        className={styles["creatives-section__img"]}
                    />
                </Creatives>
            </main>
        </>
    );
}

export default CreateVideo;