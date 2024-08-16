/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useLazyFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import CreativesListItem from "../CreativesListItem";
import { CreativeDataType } from "@/types/components/Creative";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useCookies } from "react-cookie";
import { useFetchUnvoteCreativeMutation, useFetchUpdateVoteVideoMutation, useLazyFetchAllCreativesByVotesQuery } from "@/store/wordpress/wpRestCustomApi";
import CreativesListItemSkeleton from "../CreativesListItem/CreativesListItemSkeleton";
import LoadMore from "../LoadMore";
import { useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { unvoteCreative, updateVotesAvailable, updateVotesCreatives, voteCreative } from "@/store/slice/userSlice";

interface CreativesListPropsType
{
    perPage?: number,
    orderByVotes?: boolean,
    limited?: boolean
    firstItem?: ReactNode
}

const CreativesList: FC<CreativesListPropsType> = ({ perPage = 10, orderByVotes = false, limited = false, firstItem }) =>
{
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo, { data: justVotedVideo }] = useFetchUpdateVoteVideoMutation();
    const [fetchUnvoteCreative, { data: justUnvotedVideo }] = useFetchUnvoteCreativeMutation();
    const [fetchCreativesByVotes, { data: creativesByVotes = [] }] = useLazyFetchAllCreativesByVotesQuery();
    const [fetchCreativesByDate, { data: creativesByDate = [], isFetching }] = useLazyFetchAllCreativesByDataQuery();
    const isMobile = useMediaQuery(`(max-width: 800px)`);
    const [creativesPerPage, setCreativesPerPage] = useState(perPage);
    const creatives = orderByVotes ? creativesByVotes : creativesByDate;

    useEffect(() =>
    {
        setCreativesPerPage(perPage);
    }, [perPage]);

    useEffect(() =>
    {
        if (userToken)
        {
            fetchUserData(userToken);
        }
    }, []);

    useEffect(() =>
    {
        const userVotesAvailable = userData?.meta?.votes_available;
        const userVotesCreatives = userData?.meta?.votes_creatives;

        if (userVotesAvailable) dispatch(updateVotesAvailable(+userVotesAvailable));
        if (userVotesCreatives) dispatch(updateVotesCreatives(userVotesCreatives));

    }, [userData]);

    useEffect(() =>
    {
        orderByVotes ?
            fetchCreativesByVotes({ per_page: creativesPerPage, offset: 0 }) :
            fetchCreativesByDate({ per_page: creativesPerPage, offset: 0 });
    }, [creativesPerPage, userState.votesCreatives, justVotedVideo, justUnvotedVideo]);

    const checkUserHasVoted = (creativeId: number): boolean =>
    {
        return Boolean(userState.votesCreatives.includes(String(creativeId)));
    }

    const handleVote = (creativeId) =>
    {

        if (userState.votesCreatives.includes(String(creativeId)))
        {
            fetchUnvoteCreative({ user_id: userData?.id, creative_id: creativeId });
            dispatch(unvoteCreative(String(creativeId)));
            return -1;
        } else
        {
            if (userState.votesAvailable <= 0)
            {
                alert("You have exceeded your votes limit.");
                return false;
            }
            updateVoteVideo({ user_id: userData?.id, creative_id: creativeId });
            dispatch(voteCreative(String(creativeId)));
            return 1
        }
    }

    const loadMore = () =>
    {
        setCreativesPerPage(100)
    }

    const renderSkeleton = () =>
    {
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
                    {(Boolean(creatives.length)) ?
                        creatives.map((creative: CreativeDataType) => (
                            <CreativesListItem key={creative.id} creative={creative} hasVoted={checkUserHasVoted(creative.id)} onVote={handleVote} shared={true} />
                        )) :
                        renderSkeleton()
                    }
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