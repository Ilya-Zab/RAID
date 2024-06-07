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
        url: 'link1111',
    }, {
        title: 'Rules',
        url: 'link1111',
    }, {
        title: 'Privacy Notice',
        url: 'link1111',
    }, {
        title: 'Find ID',
        url: 'link1111',
    }, {
        title: 'Email us',
        url: 'link1111',
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
                            className={styles.logo}
                        />
                    </Link>
                    <Navigation data={data}/>
                    <Box className={styles.buttons}>
                        <Box className='btnWrapper'>
                            <Button variant="contained" className={`btn-primary ${styles.btn}`}>Enter ID</Button>
                        </Box>
                        <AudioPlayer />
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default Header;