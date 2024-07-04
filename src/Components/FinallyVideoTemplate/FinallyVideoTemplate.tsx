import * as React from "react";
import styles from './styles.module.scss';
import { Box, Button, Typography } from "@mui/material";
import Image from 'next/image';
import { RegistrationForm } from "../Forms/RegistrationForm";

const FinallyVideoTemplate = () =>
{
    return (
        <Box className={styles.bg}>
            <Box className={styles.container}>
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
                        <Typography variant='body1' align='center'>Well done!</Typography>
                        <Typography variant='body2' align='center'>
                            Here&lsquo;s your special in-game promo code <br /> for submitting your entry: <span className='text-gradient'>promocode</span>
                        </Typography>
                        <Typography variant='caption'>
                            Enter your email to participate in a prize draw.<br />
                            We&lsquo;ll use it to notify you once your post <br />
                            successfully passed moderation and published*.
                        </Typography>
                    </Box>
                    <RegistrationForm />
                    {/* <Box className={styles.section__inp}>
                        <input type="text" placeholder='Enter Email' />
                        <Typography variant='caption' align='center'>
                            *It make take us up to 5 business days.
                        </Typography>
                    </Box> */}
                    {/* <Box className={styles.section__btn}>
                        <Box className='btnGradient2'>
                            <Button variant="contained" className='btn-second'>
                                Publish
                            </Button>
                        </Box>
                    </Box> */}
                </Box>
            </Box>
        </Box>
    );
}

export default FinallyVideoTemplate;