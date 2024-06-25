import { Inter } from "next/font/google";
import { useCookies } from 'react-cookie';
import { useLazyFetchUserQuery } from "@/store/wordpress/wpRestApi";

import { useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import wpRestApi from "@/services/wordpress/wpService";
import { LoginForm } from "@/Components/Forms/Login";
import { useEffect } from "react";
import CreativesList from "@/Components/Creatives/CreativesList";

import axios from "axios";
import { useLazyFetchUserCountryQuery } from "@/store/ipapi/ipapi";
import Hero from "@/Components/Layouts/Hero/Hero";
import Second from "@/Components/Layouts/Second/Second";
import Ready from "@/Components/Layouts/Ready/Ready";
import { CheckUserId } from "@/Components/Forms/CheckUserId";

const inter = Inter({ subsets: ["latin"] });

export default function Home()
{
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const unsetCookies = () =>
    {
        removeCookie('userToken');
    };

    useEffect(() =>
    {
        if (cookies.userToken)
        {
        } else
        {
            console.log('No cookies!')
        }
    }, [cookies]);

    const [checkUserCountry, { data, error }] = useLazyFetchUserCountryQuery()

    const checkUserIp = () =>
    {
        checkUserCountry({});
        if (data)
        {
            console.log(data);
        }
    }

    return (
        <main>
            <Hero />
            <Second />
            <Ready />
            {/*<button onClick={() => unsetCookies()}>unsetCookies</button>*/}
            {/* <button onClick={ }></button> */}
            <CreativesList />
            {/*<button onClick={() => checkUserIp()}>Check your IP</button>*/}
        </main >
    )
}
