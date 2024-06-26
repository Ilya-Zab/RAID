import React, {useEffect, useRef, useState} from "react";
import CreativesList from "@/Components/Creatives/CreativesList";
import styles from "./styles.module.scss";
import Image from 'next/image';
import { useMediaQuery } from "@mui/material";

const Creatives = () => {
    const beforeRef = useRef(null);
    const [topDistance, setTopDistance] = useState(0);
    const [computedTop, setComputedTop] = useState('');
    const headerHeight = 0;
    const coefficient = 0.2;
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
    let defaultTop;

    if (isMobile)
    {
        defaultTop = -401;
    } else if (isTablet)
    {
        defaultTop = -651;
    } else
    {
        defaultTop = -351;
    }

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let distanceFromHeader = Math.max(scrollTop - headerHeight, 0);
        distanceFromHeader *= coefficient;

        setTopDistance(distanceFromHeader);
        setComputedTop(`${defaultTop + distanceFromHeader}px`);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles["creatives-section"]}>
            <div className={styles['creatives-section__imgWrapper']} style={{ top: computedTop}}>
                <Image
                    ref={beforeRef}
                    style={{ top: computedTop}}
                    src='/images/vlad.png'
                    alt='vlad'
                    width={635}
                    height={804}
                    className={styles['creatives-section__img']}
                />
            </div>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <div className={styles["creatives-section__line"]}></div>
                    <h2 className={styles["creatives-section__tag"]}>
                        <span className="text-gradient">#WeFinallyPlayedIt</span>
                    </h2>
                    <h3 className={styles["creatives-section__title"]}>
                        <span className="text-gradient">Popular</span>
                    </h3>
                </div>
                <CreativesList perPage={5} />
            </div>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <h3 className={styles["creatives-section__title"]}>Latest</h3>
                </div>
                <CreativesList perPage={10} />
            </div>

        </div>
    )
}

export default Creatives;
