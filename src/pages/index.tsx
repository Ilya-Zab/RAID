import { Inter } from "next/font/google";
// import { useFetchCheckLoggedInMutation, useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';
import { useLazyFetchUserDataQuery, useLazyFetchUserQuery } from "@/store/wordpress/wpRestApi";
// import wpRestApi from "@/services/wordpress/authentication";
import { RegistrationForm } from "@/Components/Forms/RegistrationForm";
import { useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import wpRestApi from "@/services/wordpress/wpService";
import { LoginForm } from "@/Components/Forms/Login";
import { useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function Home()
{
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const [fetchUserData, { data, error, isLoading }] = useLazyFetchUserDataQuery();


    const unsetCookies = () =>
    {
        removeCookie('userToken');
    };

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

    if (data)
    {
        console.log(data);
    }

    return (
        <main>
            <RegistrationForm />
            <LoginForm />
            <button onClick={() => unsetCookies()}>unsetCookies</button>
            {/* <button onClick={ }></button> */}
        </main>
    )
}
