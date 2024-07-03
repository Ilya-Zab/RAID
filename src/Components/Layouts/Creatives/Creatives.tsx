import React, { useEffect, useRef, useState } from "react";
import CreativesList from "@/Components/Creatives/CreativesList";
import styles from "./styles.module.scss";
import Image from 'next/image';
import { useMediaQuery } from "@mui/material";
import AddCreativeCard from "@/Components/Creatives/AddCreativeCard";
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";

const Creatives = ({children}) => {
    const beforeRef = useRef(null);
    const [computedTop, setComputedTop] = useState('');
    const headerHeight = 0;
    const coefficient = 0.2;
    const isMobile = useMediaQuery('(max-width: 800px)');
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [{ userToken }] = useCookies(['userToken']);

    useEffect(() => {
        if (userToken) {
            fetchUserData(userToken);
        }
    }, [fetchUserData, userToken]);

    const defaultTop = React.useMemo(() => isMobile ? -101 : -333, [isMobile]);

    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                let distanceFromHeader = Math.max(scrollTop - headerHeight, 0);
                distanceFromHeader *= coefficient;

                setComputedTop(`${defaultTop + distanceFromHeader}px`);

                ticking = false;
            });

            ticking = true;
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    return (
        <div className={styles["creatives-section"]}>
            <div className={styles["creatives-section__imgWrapper"]} style={{ top: computedTop }}>
                <Image
                    ref={beforeRef}
                    src={`/images/${img}`}
                    alt="vlad"
                    width={635}
                    height={804}
                    className={styles["creatives-section__img"]}
                />
                {children}
            </div>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <h2 className={styles["creatives-section__tag"]}>
                        <span className="text-gradient">#WeFinallyPlayedIt</span>
                    </h2>
                    <h3 className={styles["creatives-section__title"]}>
                        <span className="text-gradient">Popular</span>
                    </h3>
                </div>
                <CreativesList perPage={isMobile ? 2 : 4} orderByVotes={true} limited={true} firstItem={<AddCreativeCard hasLogin={Boolean(userData)} />} />
            </div>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <h3 className={styles["creatives-section__title"]}>Latest</h3>
                </div>
                <CreativesList perPage={isMobile ? 9 : 10} />
            </div>
        </div>
    )
}

export default Creatives;
