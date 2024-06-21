import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';
import Image from 'next/image';
import {useEffect, useRef, useState} from "react";

const Popular = () => {

    const beforeRef = useRef(null);
    const [topDistance, setTopDistance] = useState(0);
    const [computedTop, setComputedTop] = useState('');
    const headerHeight = 0;
    const coefficient = 0.2;

    useEffect(() => {
        const isTablet = window.innerWidth >= 1024;
        const isMobile = window.innerWidth >= 768;
        const defaultTop = isMobile ? (isTablet ? -651 : -401) : -351;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            let distanceFromHeader = Math.max(scrollTop - headerHeight, 0);
            distanceFromHeader *= coefficient;

            setTopDistance(distanceFromHeader);
            setComputedTop(`${defaultTop + distanceFromHeader}px`);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box className={styles.popular}>
            <Box className={styles.popular__img__wrapper} style={{ top: computedTop}}>
                <Image
                    ref={beforeRef}
                    style={{ top: computedTop}}
                    src='/images/vlad.png'
                    alt='vlad'
                    width={635}
                    height={804}
                    className={styles.popular__img}
                />
            </Box>
            <Box className={styles.container}>
                <Box className={styles.popular__title__wrapper}>
                    <h2 className={`text-gradient ${styles.popular__title}`}>
                        #WeFinallyPlayedIt
                    </h2>
                </Box>
                <Box className={styles.popular__list__wrapper}>
                    <h3 className={`text-gradient ${styles.popular__title} ${styles.popular__title_sub}`}>
                        Popular
                    </h3>
                    <Box className={styles.popular__list}>

                    </Box>
                </Box>
                <Box className={styles.popular__list__wrapper}>
                    <h3 className={`${styles.popular__title} ${styles.popular__title_sub}`}>
                        Latest
                    </h3>
                    <Box className={styles.popular__list}>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Popular;