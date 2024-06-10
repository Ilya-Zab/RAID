import * as React from "react";
import styles from './styles.module.scss';
import {Box, Button, Typography} from "@mui/material";
import Image from 'next/image';

const FinallyVideoTemplate = () => {
    return (
        <Box className={styles.bg}>
            <Box className={styles.container}>
                <Image
                    src='/images/wefinallyplayed.svg'
                    alt='We Finally Played'
                    width={280}
                    height={47}
                    className={styles.title}
                />
                <Box className={styles.section}>
                    <Box className={styles.section__photo}>
                        <Image
                            src='/images/user.png'
                            alt='User Photo'
                            width={136}
                            height={243}
                            className={styles.photo}
                        />
                        <Typography variant='h1'>
                            UserName
                        </Typography>
                    </Box>
                    <Box className={styles.section__text}>
                        <Image
                            src='/images/wefinallyplayed.svg'
                            alt='We Finally Played'
                            width={250}
                            height={39}
                            className={styles.title}
                        />
                        <Typography variant='body2'>
                            Share on social networks
                        </Typography>
                        <Typography variant='body2'>
                            and <span>get extra votes</span>
                        </Typography>
                        <Typography variant='body2'>
                            But first, your video must be<br/>
                            moderated! Then you can share it.
                        </Typography>
                    </Box>
                    <Box className={styles.section__btn}>
                        <Box className='btnGradient2'>
                            <Button variant="contained" className='btn-second'>
                                Publish
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default FinallyVideoTemplate;