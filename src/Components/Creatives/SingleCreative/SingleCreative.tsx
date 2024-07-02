import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useFetchCreativeQuery } from "@/store/wordpress/wpRestApi";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { trimString } from "@/utils/trimString";
import VoteButton from "../VoteButton";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useCookies } from "react-cookie";
import { useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";

interface SingleCreativePropsType {
    creativeId: number
};

const SingleCreative: FC<SingleCreativePropsType> = ({ creativeId }) => {
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo] = useFetchUpdateVoteVideoMutation();
    const { data: creativeData, refetch } = useFetchCreativeQuery(creativeId);

    useEffect(() => {
        if (userToken) {
            fetchUserData(userToken);
        }
    }, [userToken, creativeData]);

    const onVote = (creativeId: number) => {
        if (userData === undefined) return false;
        if (userData.meta.votes_available === "0") {
            alert('You have no votes available.');
            return false;
        }
        updateVoteVideo({ user_id: userData.id, creative_id: creativeId });
        refetch();
        return true;
    }

    return (
        <div className={styles['single-creative']}>
            <CircularProgress className={styles['single-creative__loader']} sx={{
                color: 'white'
            }} />
            {creativeData &&
                <>
                    <div className={styles['single-creative__media']}>
                        {creativeData.meta.featured_media_type === 'video' ?
                            <video
                                autoPlay={true}
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
                                    onVote={() => onVote(creativeId)}
                                    votes={+creativeData.meta.votes}
                                    hasVoted={userData?.meta.votes_creatives.includes(String(creativeId))}
                                />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default SingleCreative;