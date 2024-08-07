import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';
import Image from 'next/image';
import {useEffect, useRef, useState} from "react";

const Popular = () => {



    return (
        <Box className={styles.popular}>

            <Box className={'container'}>
                <Box className={styles.popular__title__wrapper}>
                    <h2 className={`text-gradient ${styles.popular__title}`}>
                        #WeFinallyPlayedIt
                    </h2>
                </Box>
                <Box className={styles.popular__list__wrapper}>
                    <h3 className={`text-gradient ${styles.popular__title} ${styles.popular__title_sub}`}>
                        Popular
                    </h3>
                    <Box className={styles.popular__list}>

                    </Box>
                </Box>
                <Box className={styles.popular__list__wrapper}>
                    <h3 className={`${styles.popular__title} ${styles.popular__title_sub}`}>
                        Latest
                    </h3>
                    <Box className={styles.popular__list}>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Popular;