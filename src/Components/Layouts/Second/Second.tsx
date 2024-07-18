import React, { useRef, useEffect, useState, useTransition } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useMediaQuery } from "@mui/material";

const Second = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Box className={`${styles.second}`}>
            <Box>
                <Image
                    src='/images/brakus_the_Shifter.png'
                    alt='wolf'
                    width={816}
                    height={1120}
                    className={`parallax ${styles.second__img}`}
                    data-speed={!isMobile ? 20 : -10}
                />
            </Box>
            <Box className={'container'}>
                <Box className={styles.second__title_wrapper}>
                    <h2 className={styles.second__title}>
                        Many have<br />
                        entered the contest.<br />
                        Check how they played,<br />
                        get inspired,
                        or vote <br />for your
                        favorites!
                    </h2>
                </Box>
            </Box>
        </Box>
    );
}

export default Second;
