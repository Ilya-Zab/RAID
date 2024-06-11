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
        url: 'link1111',
    }, {
        title: 'Find ID',
        url: 'link1111',
    }, {
        title: 'Prizes',
        url: 'link1111',
    }, {
        title: 'Rules',
        url: 'link1111',
    },
];
const linksMarket = [
    {
        icon: 'app_store',
        link: '',
    },
    {
        icon: 'google_play',
        link: '',
    },
    {
        icon: 'plarium_play',
        link: '',
    },
]
const Footer = () => {
    return (
        <Box className={styles.footer__bg_wrapper}>
            <Box className={styles.footer__bg}>
                <Box className={styles.container}>
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
                                {linksMarket && linksMarket.map((item) => (
                                    <li key={item.icon} className={styles.list__item}>
                                        <Link href={item.link} passHref>
                                            <Image
                                                src={`/images/icon/${item.icon}.svg`}
                                                alt={item.icon}
                                                width={161}
                                                height={54}
                                                className={styles.markets}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;