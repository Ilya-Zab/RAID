import * as React from "react";
import styles from './styles.module.scss';
import {Box, Button, IconButton, Typography} from "@mui/material";
import Image from 'next/image';
import DropZone from "@/Components/DropZone/DropZone";

const socialArr = [
    {
        icon: 'instagram',
    },
    {
        icon: 'facebook',
    },
    {
        icon: 'tiktok',
    },
]

const CreateVideoTemplate = () => {
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
                    <Box className={styles.section__dropZone}>
                        <DropZone/>
                    </Box>
                    <Box className={styles.section__social}>
                        <Typography variant="body2">
                            or
                        </Typography>
                        <Typography variant="body2">
                            Browse from Social Media
                        </Typography>
                        <ul className={styles.list}>
                            {socialArr && socialArr.map((item) => (
                                <li key={item.icon}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label='play sound'
                                        className='iconBtn'
                                    >
                                        <Image
                                            src={`/images/icon/${item.icon}.svg`}
                                            alt={item.icon}
                                            width={40}
                                            height={40}
                                        />
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
                    </Box>
                    <Box className={styles.section__btn}>
                        <Box className='btnGradient2'>
                            <Button variant="contained" className={`btn-second ${styles.btn}`}>Make a Video</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateVideoTemplate;