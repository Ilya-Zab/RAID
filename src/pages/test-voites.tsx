import { useFetchCheckLoggedInMutation } from "@/store/wordpress/jwtApi";
import { useFetchAllCreativesQuery } from "@/store/wordpress/wpRestApi";
import { useFetchUpdateVoteVideoMutation } from "@/store/wordpress/wpRestCustomApi";
import { useLazyFetchUserDataQuery } from "@/store/wordpress/wpUser";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function TestPage()
{
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const [fetchUserData, { data: user, error: userError, isLoading }] = useLazyFetchUserDataQuery();
    const { data: creatives } = useFetchAllCreativesQuery({ order: 'asc' });

    const [updateVoteVideo, { data: updatedCreative }] = useFetchUpdateVoteVideoMutation();

    useEffect(() =>
    {
        if (cookies.userToken)
        {
            fetchUserData(cookies.userToken);
        } else
        {
            console.log('No cookies!')
        }
    }, [cookies, fetchUserData]);

    // if (userInfo)
    // {
    //     console.log(userInfo);
    // }

    // if (userError)
    // {
    //     console.log(userError);
    // }

    // if (creatives)
    // {
    //     console.log(creatives);
    // }

    if (user)
    {
        console.log(user)
    }

    const onCreativeClick = (userid, creativeId) =>
    {
        updateVoteVideo({ user_id: userid, creative_id: creativeId });
        if (updatedCreative)
        {
            console.log(updatedCreative)
        }
    };

    return (
        <div style={{ background: 'black' }}>
            <div>
                <h2>
                    {user && `User votes: ${user.meta.votes_available}`}
                </h2>
                <h2>
                    {user && `User id: ${user.id}`}
                </h2>
            </div>

            <div style={{ display: "flex", gap: '30px', flexWrap: 'wrap' }}>
                {creatives && creatives.map((creative, index) => (
                    <div
                        onClick={() => onCreativeClick(user.id, creative.id)}
                        key={index}
                        style={{ height: '150px', width: '300px', border: '1px solid red', textAlign: 'center' }}
                    >
                        <h3>{`Name ${creative.author_name}`}</h3>
                        <h3>{`AUthor ID ${creative.author}`}</h3>
                        <h3>{`Video ID ${creative.id}`}</h3>
                        <h3>{`Likes ${creative.meta.votes}`}</h3>
                    </div>
                ))}
            </div>

            <h2>API response</h2>
            <pre>
                {/* {JSON.stringify(result, null, 4)} */}
            </pre>
        </div>
    );
}