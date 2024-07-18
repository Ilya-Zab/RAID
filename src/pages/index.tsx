import React from "react";
import Creatives from "@/Components/Layouts/Creatives";
import Hero from "@/Components/Layouts/Hero/Hero";
import Second from "@/Components/Layouts/Second/Second";
import Ready from "@/Components/Layouts/Ready/Ready";
import ScrollButton from "@/Components/ScrollButton/ScrollButton";
import styles from "@/Components/Layouts/Creatives/styles.module.scss";
import Image from "next/image";
<<<<<<< HEAD
export default function Home()
{
=======
export default function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const unsetCookies = () => {
        removeCookie('userToken');
    };

    useEffect(() => {
        if (cookies.userToken) {
        } else {
            console.log('No cookies!')
        }
    }, [cookies]);

    const [checkUserCountry, { data, error }] = useLazyFetchUserCountryQuery()

    const checkUserIp = () => {
        checkUserCountry({});
        if (data) {
            console.log(data);
        }
    }

>>>>>>> 6b4f171686482b51c59f6f51054f9ef97035d35c
    return (
        <main className='home'>
            <ScrollButton />
            <Hero />
            <Second />
            <Creatives>
                <Image
                    src='/images/vlad.png'
                    alt="vlad"
                    width={829}
                    height={1274}
                    className={`${styles['creatives-section__img']} ${styles['creatives-section__img_main']} parallax`}
                    data-speed={10}
                />
            </Creatives>
            <Ready />
        </main >
    )
}
