/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Creatives from "@/Components/Layouts/Creatives";
import Title from "@/Components/Title/Title";
import Image from "next/image";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


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
                <Title title={title} correctClass={'preview'} />
                <Creatives>
                    <Image
                        src='/images/vlad-preview.png'
                        alt="vlad"
                        width={635}
                        height={804}
                        className={`${styles['creatives-section__img']} ${styles['creatives-section__img_preview']}`}
                        unoptimized
                    />
                </Creatives>
            </main>
        </>
    );
}

export default CreateVideo;