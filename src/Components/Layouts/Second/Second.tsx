import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import Image from 'next/image';

const Second = () => {
    const beforeRef = useRef(null);
    const [topDistance, setTopDistance] = useState(0);
    const [computedTop, setComputedTop] = useState('');
    const headerHeight = 0;
    const coefficient = 0.2;




    useEffect(() => {
        const isMobile = window.innerWidth >= 768;
        const defaultTop = isMobile ? -410 : -300;
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
        <Box className={`${styles.second}`}>
            <Box>
                <Image
                    ref={beforeRef}
                    style={{ top: computedTop}}
                    src='/images/brakus_the_Shifter.png'
                    alt='wolf'
                    width={816}
                    height={1120}
                    className={styles.second__img}
                />
            </Box>
            <Box className={styles.container}>
                <Box className={styles.second__title_wrapper}>
                    <h2 className={styles.second__title}>
                        Many are <br />
                        already a part <br />
                        of the contest. <br />
                        Check how they <br />
                        played, get <br />
                        inspired and <br />
                        <span className='text-gradient'>JOIN US</span>
                    </h2>
                </Box>
            </Box>
        </Box>
    );
}

export default Second;
