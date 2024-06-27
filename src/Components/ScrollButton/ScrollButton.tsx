import styles from './styles.module.scss';
import React, {useRef, useEffect, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {useMediaQuery} from "@mui/material";

const ScrollButton = () => {
    const beforeRef = useRef(null);
    const [opacity, setOpacity] = useState(1);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop >= 350) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    return (
        <div className={styles.btn__wrapper} ref={beforeRef}
             style={{opacity: opacity, transition: 'opacity 0.3s ease'}}>
            <Link href={'/'} className={styles.btn__btn}>
                <Image
                    src='/images/scroll.png'
                    alt=''
                    width={62}
                    height={62}
                    className={styles.btn__img}
                />
            </Link>
        </div>
    );
}

export default ScrollButton;
