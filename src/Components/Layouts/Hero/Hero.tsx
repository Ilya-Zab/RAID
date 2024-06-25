import * as React from 'react';
import styles from './styles.module.scss';
import Link from "next/link";
import { Box } from '@mui/material';
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";

const Hero = () =>
{
    const beforeRef = useRef(null);
    const [topDistance, setTopDistance] = useState(0);
    const [computedBottom, setComputedBottom] = useState('');
    const headerHeight = 0;
    const coefficient = 0.2;

    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');

    let defaultBottom;

    if (isMobile) {
        defaultBottom = 100;
    } else if (isTablet) {
        defaultBottom = 50;
    } else {
        defaultBottom = -106;
    }

    const handleScroll = () =>
    {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let distanceFromHeader = Math.max(scrollTop - headerHeight, 0);
        distanceFromHeader *= coefficient;

        setTopDistance(distanceFromHeader);
        setComputedBottom(`${defaultBottom - distanceFromHeader}px`);
    };
    useEffect(() =>  {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile,isTablet]);

    return (
        <Box className={styles.hero}>
            <Box className={styles.container}>
                <Box className={styles.hero__img__wrapper}>
                    <Image
                        ref={beforeRef}
                        style={{ bottom: computedBottom }}
                        src={!isMobile ? '/images/king.png' : '/images/king_mob.png'}
                        alt='king'
                        width={!isMobile ? 733 : 359}
                        height={!isMobile ? 745 : 559}
                        className={styles.hero__img}
                    />
                </Box>
                <Box className={styles.hero__title_wrapper}>
                    <h1 className={styles.hero__title}>
                        Everyone&apos;s <br />
                        <span className='text-gradient'>Playing Raid</span>.
                        <br />
                        Start Now and
                        <br />
                        <span className='text-gradient'>win </span>
                        a huge
                        <span className='text-gradient'>prize.</span>
                    </h1>
                </Box>
                <Box className={styles.hero__steps_wrapper}>
                    <p className={styles.hero__steps}>
                        <b>Step 1: </b>
                        <Link href={'/'} download className='text-gradient'>
                            download RAID
                        </Link>
                    </p>
                    <p className={styles.hero__steps}>
                        <b>Step 2: </b>
                        enter your&nbsp;
                        <Link href='#ready' className='text-gradient'>
                            RAID ID
                        </Link>
                    </p>
                    <p className={styles.hero__steps}>
                        <b>Step 3: </b> create or upload your content
                        <br />
                        to take part in the prize draw!
                    </p>
                </Box>
                <Box className={styles.hero__btn__wrapper}>
                    <Link
                        href='#ready'
                        type="button"
                        className={`hexagon-button ${styles.hero__btn}`}>
                        Join event
                    </Link>
                </Box>
                <Box className={styles.hero__title2_wrapper}>
                    <h2 className={`text-gradient ${styles.hero__title2}`}>
                        #WeFinallyPlayedIt
                    </h2>
                </Box>
            </Box>
        </Box>
    )
}
export default Hero;