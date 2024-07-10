import React, { useEffect, useState } from "react";
import CreativesList from "@/Components/Creatives/CreativesList";
import styles from "./styles.module.scss";
import { useMediaQuery } from "@mui/material";
import AddCreativeCard from "@/Components/Creatives/AddCreativeCard";
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useLazyFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import { useRouter } from "next/router";
import MyCreativeCard from "@/Components/Creatives/MyCreativeCard";
import { useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";

const Creatives = ({ children }) => {
    const router = useRouter();
    const [computedTop, setComputedTop] = useState('');
    const headerHeight = 0.00234131;
    const coefficient = 0.20934;
    const isMobile = useMediaQuery('(max-width: 800px)');
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo] = useFetchUpdateVoteVideoMutation();
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchCreativesByDate, { data: creativePending = [] }] = useLazyFetchAllCreativesByDataQuery();
    const pageSlug = router.pathname.split('/').filter(slug => slug)[0] || '';

    useEffect(() => {
        if (userToken) {
            fetchUserData(userToken);
        }
    }, [fetchUserData, userToken]);

    useEffect(() => {
        if (userData?.id) {
            fetchCreativesByDate({
                per_page: 1,
                author: userData.id,
                status: 'pending,publish'
            })
        }
    }, [userData]);



    const defaultTop = React.useMemo(() => isMobile ? -101 : -333, [isMobile]);

    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                let distanceFromHeader = Math.max(scrollTop - headerHeight, 0);
                distanceFromHeader = parseFloat((distanceFromHeader * coefficient).toFixed(8));

                setComputedTop(`${defaultTop + distanceFromHeader}px`);

                ticking = false;
            });

            ticking = true;
        }
    };

    const onVote = (creativeId: number) => {
        if (userData === undefined) return false;
        if (userData.meta.votes_available === "0") {
            alert('You have no votes available.');
            return false;
        }
        updateVoteVideo({ user_id: userData.id, creative_id: creativeId });


        fetchCreativesByDate({
            per_page: 1,
            author: userData.id,
            status: 'pending,publish'
        })

        return true;
    }

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);


    const checkUserHasVoted = (creativeId) => {
        if (userData !== undefined) {
            return userData.meta.votes_creatives.includes(String(creativeId));
        }
    }

    return (
        <div className={styles["creatives-section"]}>
            <div className={styles["creatives-section__imgWrapper"]} style={{ top: computedTop }}>
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
                <CreativesList
                    perPage={isMobile ? 2 : 4}
                    orderByVotes={true}
                    limited={true}
                    firstItem={(pageSlug === 'preview' && creativePending.length) ?
                        <MyCreativeCard
                            creative={creativePending[0]}
                            hasVoted={checkUserHasVoted(creativePending[0].id)}
                            onVote={onVote}
                        /> :
                        <AddCreativeCard hasLogin={Boolean(userData)} />
                    }
                />
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
