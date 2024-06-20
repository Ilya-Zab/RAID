import * as React from 'react';
import styles from './styles.module.scss';
import {Box, AppBar, Toolbar, Button } from '@mui/material';
import Image from 'next/image';
import Link from "next/link";
import Navigation from '../Navigation/Navigation';
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

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

const Header: React.FC = () => {
    return (
        <AppBar position="static" className={styles.header}>
            <Box className={styles.container}>
                <Toolbar disableGutters className={styles.header__toolbar}>
                    <Link href={'/'} passHref className={styles.logo}>
                        <Image
                            src='/images/logo.png'
                            alt='Logo'
                            width={75}
                            height={41}
                            className={styles.logo_img}
                        />
                    </Link>
                    <Navigation data={data}/>
                    <Box className={styles.buttons}>
                        <Link
                            href={'#'}
                            download
                            className={`hexagon-button hexagon-button__second ${styles.btn}`}>
                            Download RAID
                        </Link>
                        <AudioPlayer />
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default Header;