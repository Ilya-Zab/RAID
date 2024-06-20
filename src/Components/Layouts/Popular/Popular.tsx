import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';

const Popular = () => {
    return (
        <Box className={styles.popular}>
            <Box className={styles.container}>
                <Box className={styles.popular__title_wrapper}>
                    <h2 className={`text-gradient ${styles.popular__title}`}>
                        #WeFinallyPlayedIt
                    </h2>
                </Box>
            </Box>
        </Box>
    )
}
export default Popular;