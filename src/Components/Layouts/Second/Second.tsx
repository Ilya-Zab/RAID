import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';

const Second = () => {
    return (
        <Box className={styles.second}>
            <Box className={styles.container}>
                <Box className={styles.second__title_wrapper}>
                    <h2 className={styles.second__title}>
                        Many are <br/>
                        already a part <br/>
                        of the contest. <br/>
                        Check how they <br/>
                        played, get <br/>
                        inspired and <br/>
                        <span className='text-gradient'>JOIN US</span>
                    </h2>
                </Box>
            </Box>
        </Box>
    )
}

export default Second;