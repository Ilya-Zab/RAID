import * as React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Box, AppBar, Toolbar, IconButton, SwipeableDrawer } from '@mui/material';
import MobileHeaderDrawer from '@/Components/Layouts/MobileHeader/MobileHeaderDrawer/MobileHeaderDrawer';

const MobileHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpenMenu(open);
    };

    return (
        <AppBar position="static" className={styles.header}>
            <Box className={styles.container}>
                <Toolbar disableGutters className={styles.header__toolbar}>
                    <Link href="/" passHref className={styles.logo}>
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={49}
                            height={25}
                            className={styles.logo}
                        />
                    </Link>
                    <IconButton className='iconBtn' onClick={toggleDrawer(true)}>
                        <Image
                            src="/images/icon/burger.svg"
                            alt="Burger"
                            width={24}
                            height={24}
                            className={styles.burger}
                        />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={openMenu}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        <MobileHeaderDrawer toggleDrawer={toggleDrawer} open={openMenu} />
                    </SwipeableDrawer>
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default MobileHeader;
