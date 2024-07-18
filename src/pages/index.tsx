import React from "react";
import Creatives from "@/Components/Layouts/Creatives";
import Hero from "@/Components/Layouts/Hero/Hero";
import Second from "@/Components/Layouts/Second/Second";
import Ready from "@/Components/Layouts/Ready/Ready";
import ScrollButton from "@/Components/ScrollButton/ScrollButton";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import Image from "next/image";
export default function Home()
{
    return (
        <main className='home'>
            <ScrollButton />
            <Hero />
            <Second />
            <Creatives>
                <Image
                    src='/images/vlad.png'
                    alt="vlad"
                    width={829}
                    height={1274}
                    className={`${styles['creatives-section__img']} ${styles['creatives-section__img_main']} tr-par`}
                />
            </Creatives>
            <Ready />
        </main >
    )
}
