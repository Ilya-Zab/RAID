import * as React from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import Image from 'next/image';
import PromoCode from "@/Components/PromoCode/PromoCode";
import { LoginForm } from '@/Components/Forms/LoginForm';
import { useMediaQuery } from "@mui/material";

const Ready = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.ready} id='ready'>
            <Image
                src={`/images/${isMobile ? 'png_char_mob_new.png' : 'png_char.png'}`}
                alt=''
                width={isMobile ? 280 : 857}
                height={isMobile ? 388 : 3114}
                className={`tr-par ${styles["ready__img"]}`}
            />
            <div className="container">
                <h2 className={styles["ready__title"]}>
                    Ready to go?
                </h2>
            </div>
            <div className="container container_creatives">
                <div className={`subtract-box subtract-box_big ${styles["ready__forms"]}`}>
                    <PromoCode />
                    <div className={styles["ready__forms-line-wrapper"]}>
                        <div className={styles["ready__forms-line"]}></div>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
export default Ready;