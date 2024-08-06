import * as React from 'react';
import styles from './styles.module.scss';
import { Box, AppBar, Toolbar, Button } from '@mui/material';
import Image from 'next/image';
import Link from "next/link";
import Navigation from '../Navigation/Navigation';
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

const data = [
    {
        title: 'Prizes',
        url: '',
    }, {
        title: 'Rules',
        url: '',
    }, {
        title: 'Privacy Notice',
        url: '',
    }, {
        title: 'Find ID',
        url: '',
    }, {
        title: 'Email Us',
        url: 'mailto:support@wefinallyplayedit.com',
    }, {
        title: 'Materials',
        url: '',
    }
];

const Header: React.FC = () =>
{
    return (
        <AppBar position="static" className={styles.header}>
            <Box className={'container'}>
                <Toolbar disableGutters className={styles.header__toolbar}>
                    <Link href={'/'} passHref className={styles.logo}>
                        <Image
                            src='/images/logo.png'
                            alt='Logo'
                            width={75}
                            height={41}
                            className={styles.logo_img}
                            unoptimized
                        />
                    </Link>
                    <Navigation data={data} />
                    <Box className={styles.buttons}>
                        <Link
                            href={'https://pl.go-ga.me/chnosnyx'}
                            className={`hexagon-button hexagon-button_gradient ${styles.btn}`}>
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