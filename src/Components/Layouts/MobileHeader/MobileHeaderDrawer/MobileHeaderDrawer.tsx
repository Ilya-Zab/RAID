import * as React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Divider,Button } from '@mui/material';
import Navigation from "@/Components/Layouts/Navigation/Navigation";
import AudioPlayer from "@/Components/AudioPlayer/AudioPlayer";

const data = [
    {
        title: 'Prizes',
        url: '/prizes',
    }, {
        title: 'Rules',
        url: '/rules',
    }, {
        title: 'Privacy Notice',
        url: '/privacy-notice',
    }, {
        title: 'Find ID',
        url: '/find-id',
    }, {
        title: 'Email us',
        url: '/email-ul',
    }
];

const MobileHeaderDrawer = ({ toggleDrawer }) => {
    return (
        <Box
            role="presentation"
            onKeyDown={toggleDrawer(false)}
            className={styles.wrapper}
        >
            <Box className={styles.logo__wrapper}>
                <Link href="/" passHref className={styles.logo}>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={49}
                        height={25}
                        className={styles.logo_img}
                    />
                </Link>
            </Box>
            <Navigation data={data} correctStyle={styles.navMob}/>
            <Divider />
            <Box className={styles.buttons}>
                <Link
                    href={'#'}
                    download
                    className={`hexagon-button hexagon-button__second ${styles.btn}`}>
                    Download RAID
                </Link>
                <AudioPlayer />
            </Box>
        </Box>
    );
};

export default MobileHeaderDrawer;
