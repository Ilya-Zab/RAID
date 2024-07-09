import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';
import Image from 'next/image';
import Link from "next/link";
import Navigation from "@/Components/Layouts/Navigation/Navigation";

const data = [
    {
        title: 'About',
        url: 'link1111',
    }, {
        title: 'Contact',
        url: 'link1111',
    }, {
        title: 'Privacy Notice',
        url: '/privacy-notice',
    }, {
        title: 'Find ID',
        url: '',
    }, {
        title: 'Prizes',
        url: '',
    }, {
        title: 'Rules',
        url: '',
    },
];
const Footer = () => {
    return (
        <footer className={styles.footer__bg_wrapper}>
            <Box className={styles.footer__bg}>
                <Box className={'container'}>
                    <Box className={styles.footer}>
                        <Box className={styles.footer_left}>
                            <Link href={'/'} passHref className={styles.logo}>
                                <Image
                                    src='/images/logo-footer.png'
                                    alt='Logo'
                                    width={203}
                                    height={125}
                                    className={styles.logo}
                                />
                            </Link>
                            <Box className={styles.nav_wrapper}>
                                <Navigation correctStyle={styles.nav_list} data={data}/>
                            </Box>
                        </Box>
                        <Box className={styles.footer_right}>
                            <ul className={styles.list}>
                                <li className={styles.list__item}>
                                    <Link
                                        href={'https://pl.go-ga.me/chnosnyx'}
                                        className={`hexagon-button hexagon-button_gradient ${styles.btn}`}>
                                        Download RAID
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}

export default Footer;