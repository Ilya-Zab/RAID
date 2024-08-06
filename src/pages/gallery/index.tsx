/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/redux";
import { useCookies } from "react-cookie";


const CreateVideo = () =>
{
    const [{ userToken }] = useCookies(['userToken']);
    const { raidId } = useAppSelector(state => state.raidId);
    const router = useRouter();

    useEffect(() =>
    {
        if (!userToken && !raidId)
        {
            router.push('/');
        }
    }, []);


    const pageTitle = 'Gallery';
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
                <Title title={title} correctClass={'gallery'} />
                <Creatives>
                    <Image
                        src='/images/vlad-gallery.png'
                        alt="vlad"
                        width={531}
                        height={788}
                        className={`${styles['creatives-section__img']} ${styles['creatives-section__img_gallery']}`}
                        unoptimized
                    />
                </Creatives>
            </main>
        </>
    );
}

export default CreateVideo;