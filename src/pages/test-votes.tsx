import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React, { useEffect, useState } from "react";
import { voteCreative, unvoteCreative, updateVotesCreatives, updateVotesAvailable } from "@/store/slice/userSlice"
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";

const creatives = [
    { id: "595", votes: "10" },
    { id: "538", votes: "10" },
    { id: "447", votes: "10" },
    { id: "375", votes: "10" },
    { id: "331", votes: "10" },
    { id: "329", votes: "10" },
    { id: "290", votes: "10" },
    { id: "288", votes: "10" },
    { id: "286", votes: "10" },
    { id: "284", votes: "10" },
];

const VoteButton = ({ hasVoted, votes, onVote }) => {
    const [buttonVotes, setVotes] = useState(votes);
    const [justClicked, setJustClicked] = useState(false);

    useEffect(() => {
        setVotes(+votes);
    }, [votes]);

    useEffect(() => {
        if (justClicked) setVotes((votes) => votes + justClicked);
    }, [justClicked])

    const handleClick = () => {
        setJustClicked(onVote());
    }

    return (
        <button onClick={handleClick} style={{ backgroundColor: hasVoted ? "coral" : "white" }}>{hasVoted ? "Unlike" : "Like"} - {buttonVotes}</button>
    );
}

const TestVotes = () => {
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [isClient, setIsClient] = useState(false)
    const [{ userToken }] = useCookies(['userToken']);
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [updateVoteVideo] = useFetchUpdateVoteVideoMutation();

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
        setIsClient(true)
    }, []);

    const handleVote = (creativeId) => {
        if (userState.votesAvailable <= 0) {
            alert("You do not have an any vote available!");
            return false;
        }

        if (userState.votesCreatives.includes(creativeId)) {
            dispatch(unvoteCreative(creativeId));
            return -1;
        } else {
            if (userData?.id) {
                updateVoteVideo({ user_id: userData.id, creative_id: creativeId });
            }
            dispatch(voteCreative(creativeId));
            return 1
        }
    }



    if (!isClient) return;

    return (
        <div
            style={{
                background: 'black',
                padding: "50px 100px",
            }}
        >
            <h3>User state</h3><br />
            <ul>
                <li>{`Voted creatives: [${userState.votesCreatives.join(", ")}]`}</li>
                <li>Votes available: {userState.votesAvailable}</li>
            </ul>
            <br />
            <h3>Creatives</h3><br />
            <ul>
                {creatives?.map(creative => (
                    <li key={creative.id} style={{ display: "grid", gridTemplateColumns: "50px 100px", marginBottom: 10 }}>
                        <span>{creative.id}</span>
                        <VoteButton hasVoted={userState.votesCreatives.includes(creative.id)} votes={creative.votes} onVote={() => handleVote(creative.id)} />
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default TestVotes;