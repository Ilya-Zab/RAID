/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useTransition } from "react";
import CreativesList from "@/Components/Creatives/CreativesList";
import styles from "./styles.module.scss";
import { useMediaQuery } from "@mui/material";
import AddCreativeCard from "@/Components/Creatives/AddCreativeCard";
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useLazyFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import { useRouter } from "next/router";
import MyCreativeCard from "@/Components/Creatives/MyCreativeCard";
import { useFetchUnvoteCreativeMutation, useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { unvoteCreative, updateVotesAvailable, updateVotesCreatives, voteCreative } from "@/store/slice/userSlice";

const Creatives = ({ children }) => {
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 800px)');
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo, { data: justVotedVideo }] = useFetchUpdateVoteVideoMutation();
    const [fetchUnvoteCreative, { data: justUnvotedVideo }] = useFetchUnvoteCreativeMutation();
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchCreativesByDate, { data: creativePending = [] }] = useLazyFetchAllCreativesByDataQuery();
    const pageSlug = router.pathname.split('/').filter(slug => slug)[0] || '';
    const { raidId } = useAppSelector(state => state.raidId);


    useEffect(() => {
        if (userToken) {
            fetchUserData(userToken);
        }
    }, []);

    useEffect(() => {
        const userVotesAvailable = userData?.meta?.votes_available;
        const userVotesCreatives = userData?.meta?.votes_creatives;

        if (userVotesAvailable) dispatch(updateVotesAvailable(+userVotesAvailable));
        if (userVotesCreatives) dispatch(updateVotesCreatives(userVotesCreatives));

    }, [userData]);

    useEffect(() => {
        if (userData?.id) {
            fetchCreativesByDate({
                per_page: 1,
                author: userData.id,
                status: 'pending,publish'
            })
        }
    }, [userData, userState.votesCreatives, justVotedVideo, justUnvotedVideo]);

    const checkUserHasVoted = (creativeId: number): boolean => {
        return Boolean(userState.votesCreatives.includes(String(creativeId)));
    }

    const handleVote = (creativeId) => {
        if (userState.votesAvailable <= 0) {
            alert("You do not have an any vote available!");
            return false;
        }

        if (userState.votesCreatives.includes(String(creativeId))) {
            fetchUnvoteCreative({ user_id: userData?.id, creative_id: creativeId });
            dispatch(unvoteCreative(String(creativeId)));
            return -1;
        } else {
            updateVoteVideo({ user_id: userData?.id, creative_id: creativeId });
            dispatch(voteCreative(String(creativeId)));
            return 1
        }

    }

    return (
        <div className={styles["creatives-section"]}>
            <div
                className={`parallax ${styles["creatives-section__imgWrapper"]}`}
                data-speed={-30}
            >
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
                            onVote={handleVote}
                        /> :
                        <AddCreativeCard hasLogin={Boolean(userData) || Boolean(raidId)} />
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
