import React, { FC, ReactNode, useEffect, useState } from "react";
import { useLazyFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import CreativesListItem from "../CreativesListItem";
import { CreativeDataType } from "@/types/components/Creative";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useCookies } from "react-cookie";
import { useFetchUpdateVoteVideoMutation, useLazyFetchAllCreativesByVotesQuery } from "@/store/wordpress/wpRestCustomApi";
import CreativesListItemSkeleton from "../CreativesListItem/CreativesListItemSkeleton";
import LoadMore from "../LoadMore";
import { useMediaQuery } from "@mui/material";

interface CreativesListPropsType {
    perPage?: number,
    orderByVotes?: boolean,
    limited?: boolean
    firstItem?: ReactNode
}

const CreativesList: FC<CreativesListPropsType> = ({ perPage = 10, orderByVotes = false, limited = false, firstItem }) => {
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo] = useFetchUpdateVoteVideoMutation();
    const [fetchCreativesByVotes, { data: creativesByVotes = [] }] = useLazyFetchAllCreativesByVotesQuery();
    const [fetchCreativesByDate, { data: creativesByDate = [], isFetching }] = useLazyFetchAllCreativesByDataQuery();
    const isMobile = useMediaQuery(`(max-width: 800px)`);
    const [creativesPerPage, setCreativesPerPage] = useState(perPage);

    const creatives = orderByVotes ? creativesByVotes : creativesByDate;

    useEffect(() => {
        if (userToken) {
            fetchUserData(userToken);
        }

        orderByVotes ?
            fetchCreativesByVotes({ per_page: creativesPerPage, offset: 0 }) :
            fetchCreativesByDate({ per_page: creativesPerPage, offset: 0 });
    }, [userToken, creativesPerPage, orderByVotes, , fetchCreativesByDate, fetchUserData]);

    const loadMore = () => {
        setCreativesPerPage(100)
    }

    const checkUserHasVoted = (creativeId) => {
        if (userData !== undefined) {
            return userData.meta.votes_creatives.includes(String(creativeId));
        }
    }

    const onVote = (creativeId: number) => {
        if (userData === undefined) return false;
        if (userData.meta.votes_available === "0") {
            alert('You have no votes available.');
            return false;
        }
        updateVoteVideo({ user_id: userData.id, creative_id: creativeId });
        return true;
    }

    const renderListItems = () => {
        return creatives.map((creative: CreativeDataType) => (
            <CreativesListItem key={creative.id} creative={creative} hasVoted={checkUserHasVoted(creative.id)} onVote={onVote} />
        ))
    }

    const renderSkeleton = () => {
        const skeletonItems = [];
        for (let i = 0; i < creativesPerPage; i++) skeletonItems.push(
            <CreativesListItemSkeleton key={i} />
        )
        return skeletonItems;
    }

    return (
        <>
            <div className="container container_creatives">
                <div className="creatives-list-grid">
                    {firstItem && firstItem}
                    {(Boolean(creatives.length) && !isFetching) ? renderListItems() : renderSkeleton()}
                </div>
            </div>

            {(!limited && creativesPerPage < 100) &&
                <div className={!isMobile && 'container'}>
                    <LoadMore onClick={loadMore} />
                </div>
            }
        </>
    )
}

export default CreativesList;