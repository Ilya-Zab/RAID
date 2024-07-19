/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useFetchCreativeQuery } from "@/store/wordpress/wpRestApi";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { trimString } from "@/utils/trimString";
import VoteButton from "../VoteButton";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useCookies } from "react-cookie";
import { useFetchUnvoteCreativeMutation, useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { unvoteCreative, updateVotesAvailable, updateVotesCreatives, voteCreative } from "@/store/slice/userSlice";
import Sharing from "../Sharing";

interface SingleCreativePropsType {
    creativeId: number
};

const SingleCreative: FC<SingleCreativePropsType> = ({ creativeId }) => {
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo, { data: justVotedVideo }] = useFetchUpdateVoteVideoMutation();
    const [fetchUnvoteCreative, { data: justUnvotedVideo }] = useFetchUnvoteCreativeMutation();
    const { data: creativeData, refetch } = useFetchCreativeQuery(creativeId);
    const [onPause, setPause] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    console.log(videoRef);

    useEffect(() => {
        if (onPause) {
            videoRef.current.pause();
        } else if (videoRef !== null) {
            videoRef?.current?.play();
        }
    }, [onPause]);

    useEffect(() => {
        refetch();
    }, [justVotedVideo, justUnvotedVideo, userState.votesCreatives]);

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

    const checkUserHasVoted = (creativeId: number): boolean => {
        return Boolean(userState.votesCreatives.includes(String(creativeId)));
    }

    const handleVote = (creativeId) => {

        if (userState.votesCreatives.includes(String(creativeId))) {
            fetchUnvoteCreative({ user_id: userData?.id, creative_id: creativeId });
            dispatch(unvoteCreative(String(creativeId)));
            refetch();
            return -1;
        } else {
            if (userState.votesAvailable <= 0) {
                alert("You have exceeded your votes limit.");
                return false;
            }
            updateVoteVideo({ user_id: userData?.id, creative_id: creativeId });
            dispatch(voteCreative(String(creativeId)));
            refetch();
            return 1
        }

    }

    return (
        <>
            <div className={styles['single-creative']}>
                <CircularProgress className={styles['single-creative__loader']} sx={{
                    color: 'white'
                }} />
                {creativeData &&
                    <>
                        <div className={styles['single-creative__media']}>
                            {creativeData.meta.featured_media_type === 'video' ?
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay={true}
                                        onClick={() => { setPause(true) }}
                                        playsInline={true}
                                        loop
                                        width="100%"
                                        height="100%"
                                        className={styles["single-creative__media-video"]}
                                    >
                                        <source
                                            src={`${creativeData.meta.featured_media_url && creativeData.meta.featured_media_url}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                    {onPause &&
                                        <button
                                            className={styles['single-creative__play']}
                                            onClick={() => { setPause(false) }}
                                        >
                                            <Image src={'/images/play.svg'} width={32} height={32} alt="play" />
                                        </button>
                                    }
                                </>
                                :
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    src={`${creativeData.meta.featured_media_url && creativeData.meta.featured_media_url}`} alt={creativeData.title.rendered}
                                />
                            }
                        </div>
                        <div className={styles['single-creative__content']}>
                            <div className={styles["single-creative__top"]}></div>
                            <div className={styles["single-creative__bottom"]}>
                                <div className={styles["single-creative__title"]}>
                                    <div className={styles["single-creative__title-bg"]}></div>
                                    <div className={styles["single-creative__title-label"]}>
                                        {trimString(creativeData.title.rendered, 20)}
                                    </div>
                                </div>
                                <div className={styles['single-creative__votes']}>
                                    <VoteButton
                                        onVote={() => handleVote(creativeId)}
                                        votes={+creativeData.meta.votes}
                                        hasVoted={checkUserHasVoted(creativeId)}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={styles['single-creative__sharing']}>
                <Sharing
                    title={
                        <><span className="text-gradient text-gradient_alt fw-700 ">Share</span> on social networks</>
                    }
                    text={
                        <>& invite friends to <span className="text-gradient text-gradient_alt fw-600 ">vote for it</span>! Or join the event yourself.</>
                    }
                    creativeId={creativeId}
                />
            </div>

        </>
    );
}

export default SingleCreative;