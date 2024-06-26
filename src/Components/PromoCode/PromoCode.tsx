import React, { useState } from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';
import Link from "next/link";

const PromoCode = () => {
    const textToCopy = 'WEFINALLY2024';
    const [copied, setCopied] = useState(false);

    const copyPromoCode = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Error copying text:', err);
        });
    };
    return (
        <Box className={`subtract-box subtract-box_small ${styles.promo}`}>
            <h2 className={styles.promo__title}>
                Install the game to get your Raid ID and take part in the competition
            </h2>
           <Box className={styles.promo__wrapper}>
               <Link
                   href={'#'}
                   download
                   className={`hexagon-button hexagon-button_gradient ${styles.promo__link}`}>
                   Download RAID
               </Link>
               <p className={styles.promo__text}>
                   A small appreciation gift for all players! Redeem promo code:
               </p>
               <Box className={styles.promo__code} onClick={copyPromoCode}>
                   {copied && <span >code copied</span>}
                   <p className='text-gradient'>
                       {textToCopy}
                   </p>
                   <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7.91667 3.21429L7.91667 10.9286C7.91667 11.2127 7.80692 11.4853 7.61157 11.6862C7.41622 11.8871 7.15127 12 6.875 12L1.04167 12C0.7654 12 0.500447 11.8871 0.305098 11.6862C0.109747 11.4853 9.38808e-09 11.2127 1.27767e-08 10.9286L1.04769e-07 3.21429C1.08157e-07 2.93013 0.109747 2.6576 0.305098 2.45667C0.500447 2.25574 0.7654 2.14286 1.04167 2.14286L6.875 2.14286C7.15127 2.14286 7.41622 2.25574 7.61157 2.45667C7.80692 2.6576 7.91667 2.93013 7.91667 3.21429ZM1.25 3.42857L1.25 10.7143L6.66667 10.7143L6.66667 3.42857L1.25 3.42857ZM8.95833 -1.24218e-08L2.5 -8.94366e-08C2.33424 -9.14133e-08 2.17527 0.0677299 2.05806 0.188289C1.94085 0.308847 1.875 0.472361 1.875 0.642857C1.875 0.813353 1.94085 0.976867 2.05806 1.09743C2.17527 1.21798 2.33424 1.28571 2.5 1.28571L8.75 1.28571L8.75 9.42857C8.75 9.59907 8.81585 9.76258 8.93306 9.88314C9.05027 10.0037 9.20924 10.0714 9.375 10.0714C9.54076 10.0714 9.69973 10.0037 9.81694 9.88314C9.93415 9.76258 10 9.59907 10 9.42857L10 1.07143C10 0.787268 9.89025 0.514746 9.6949 0.313814C9.49955 0.112883 9.2346 -9.1273e-09 8.95833 -1.24218e-08Z" fill="#C1C1C1"/>
                   </svg>
               </Box>
               <time className={styles.promo__data}>
                   *available till JULY 31
               </time>
               <p className={styles.promo__text}>How to redeem the promo code</p>
           </Box>
        </Box>
    )
}
export default PromoCode;