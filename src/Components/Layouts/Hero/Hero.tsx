import * as React from 'react';
import styles from './styles.module.scss';
import Link from "next/link";
import {Box} from '@mui/material';

const Hero = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.hero__title_wrapper}>
                <h1 className={styles.hero__title}>
                    Everyone's <br/>
                    <span className='text-gradient'>Playing Raid</span>
                    .
                    <br/>
                    Start Now and
                    <br/>
                    <span className='text-gradient'>win</span>
                    a huge
                    <span className='text-gradient'>prize.</span>
                </h1>
            </Box>
            <Box className={styles.hero__steps_wrapper}>
                <p className={styles.hero__steps}>
                    <b>Step 1: </b>
                    <Link href={'/'} className='text-gradient'>
                        download RAID
                    </Link>
                </p>
                <p className={styles.hero__steps}>
                    <b>Step 2: </b>
                    enter your&nbsp;
                    <Link href={'/'} className='text-gradient'>
                          RAID ID
                    </Link>
                </p>
                <p className={styles.hero__steps}>
                    <b>Step 3: </b> create or upload your content
                    <br/>
                    to take part in the prize draw!
                </p>
            </Box>
            <Box className={styles.hero__btn_wrapper}>
                <button
                    type="button"
                    className={`hexagon-button`}>
                    Join event
                </button>
            </Box>
            <Box className={styles.hero__title2_wrapper}>
                <h2 className={`text-gradient ${styles.hero__title2}`}>
                    #WeFinallyPlayedIt
                </h2>
            </Box>
        </Box>
    )
}
export default Hero;