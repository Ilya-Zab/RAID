import * as React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from "next/link";
import {Box, AppBar, Toolbar, Button, IconButton } from '@mui/material';

const MobileHeader: React.FC = () => {
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
                    <IconButton className='iconBtn'>
                        <Image
                            src='/images/icon/burger_on.svg'
                            alt='Burger'
                            width={46}
                            height={40}
                            className={styles.burger}
                        />
                    </IconButton>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default MobileHeader;