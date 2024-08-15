import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const restrictedCountries = ['BY', 'UA', 'RU'];
export function useCheckUserId()
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cookie, setCookie] = useCookies(['accessDenied']);
    const [accessDenied, setDenied] = useState(false);

    async function checkUserId()
    {
        if (cookie && cookie.accessDenied)
        {
            setDenied(true);
        }
        try
        {
            const response = await axios.get('https://ipapi.co/json');
            console.log(response);
            const countryCode = response.data.continent_code;

            if (restrictedCountries.includes(countryCode))
            {
                setDenied(true);
                const expiresDate = new Date();
                expiresDate.setFullYear(expiresDate.getFullYear() + 10);
                setCookie('accessDenied', true, { path: '/', expires: expiresDate });
            }
        } catch (error)
        {
            console.error('Error fetching IP data:', error);
        }
    }
    return { checkUserId, accessDenied };
}
