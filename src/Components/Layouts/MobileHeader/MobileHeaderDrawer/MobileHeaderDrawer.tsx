import * as React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Divider, Button } from '@mui/material';
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
        title: 'Email Us',
        url: 'mailto:support@wefinallyplayedit.com',
    }, {
        title: 'Materials',
        url: '/materials',
    }
];

type MobileHeaderDrawerProps = {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const MobileHeaderDrawer: React.FC<MobileHeaderDrawerProps> = ({ toggleDrawer }) =>
{
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
            <Navigation data={data} correctStyle={styles.navMob} />
            <Divider />
            <Box className={styles.buttons}>
                <Link
                    href={'https://pl.go-ga.me/chnosnyx'}
                    className={`hexagon-button hexagon-button_gradient ${styles.btn}`}>
                    Download RAID
                </Link>
                <AudioPlayer />
            </Box>
        </Box>
    );
};

export default MobileHeaderDrawer;
