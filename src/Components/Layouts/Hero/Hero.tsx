import * as React from 'react';
import styles from './styles.module.scss';
import Link from "next/link";
import { Box } from '@mui/material';
import Image from 'next/image';
import { useMediaQuery } from "@mui/material";

const Hero = () =>
{
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Box className={styles.hero}>
            <Box className={`container ${styles.wrapper}`}>

                <Image
                    src={!isMobile ? '/images/king.png' : '/images/king_mob.png'}
                    alt='king'
                    width={!isMobile ? 733 : 359}
                    height={!isMobile ? 745 : 559}
                    className={`${styles.hero__img} parallax`}
                    data-speed={!isMobile ? -30 : -10}
                />
                <Box>
                    <Box className={styles.hero__title_wrapper}>
                        <h1 className={styles.hero__title}>
                            IT&apos;LL NEVER BE THE SAME ONCE YOU <span className='text-gradient'>PLAY RAID</span>. SHOW HOW YOU DO IT AND<span className='text-gradient'> WIN </span> EXICTING <span className='text-gradient'> PRIZES</span>!
                        </h1>
                    </Box>
                    <Box className={styles.hero__steps_wrapper}>
                        <p className={styles.hero__steps}>
                            <b>Step 1: </b>
                            <Link href={'https://pl.go-ga.me/chnosnyx'} target='_blank' className='text-gradient'>
                                Download RAID
                            </Link>
                        </p>
                        <p className={styles.hero__steps}>
                            <b>Step 2: </b>
                            Enter your&nbsp;
                            <Link href='#ready' className='text-gradient'>
                                RAID ID
                            </Link>
                        </p>
                        <p className={styles.hero__steps}>
                            <b>Step 3: </b> Create or upload your content
                            <br />
                            to take part in the prize draw!
                        </p>
                        <p className={styles.hero__text}>
                            More likes - more chances to win!<br />
                            Make sure to share on all your social media channels with the hashtag #WeFinallyPlayedIt.
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
                </Box>
                <Box className={styles.hero__title2_wrapper}>
                    <h2 className={`text-gradient animate animate_7 ${styles.hero__title2}`}>
                        #WeFinallyPlayedIt
                    </h2>
                </Box>
            </Box>
        </Box>
    )
}
export default Hero;