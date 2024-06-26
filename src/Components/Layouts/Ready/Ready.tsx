import * as React from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import PromoCode from "@/Components/PromoCode/PromoCode";
import { CheckUserId } from '@/Components/Forms/CheckUserId';

const Ready = () =>
{
    return (
        <Box className={styles.ready} id='ready'>
            <Box className={styles.container}>
                <Box className={styles.ready__title__wrapper}>
                    <h2 className={styles.ready__title}>
                        Ready to go?
                    </h2>
                </Box>
                <Box className={`subtract-box subtract-box_big ${styles.ready__forms}`}>
                    <Box>
                        <PromoCode />
                        <CheckUserId />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Ready;