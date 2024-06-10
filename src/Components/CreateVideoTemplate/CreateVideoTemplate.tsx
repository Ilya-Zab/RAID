import * as React from "react";
import styles from './styles.module.scss';
import {Box, Button, TextField, Typography, IconButton} from "@mui/material";
import Image from 'next/image';
import DropZone from "@/Components/DropZone/DropZone";
import {styled} from '@mui/material/styles';
// import SocialNetworks from "@/Components/SocialNetworks/SocialNetworks";
// import {useState} from "react";

const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(66, 113, 161, 0.58);
    border-radius: 8px;
  }

  .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(66, 113, 161, 0.58);
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-color: rgba(66, 113, 161, 0.58);
      }
    }
  }

  .MuiInputLabel-root {
    &.Mui-focused {
      color: rgba(66, 113, 161, 0.58);

      .MuiOutlinedInput-notchedOutline {
        border-color: rgba(66, 113, 161, 0.58);
      }
    }
  }
`;

const CustomIcon = () => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.4859 3.02261C11.4419 2.06261 12.8406 2.04261 13.6146 2.81995C14.3906 3.59861 14.3699 5.00661 13.4125 5.96661L11.7972 7.58861C11.7063 7.68304 11.656 7.80941 11.6574 7.94052C11.6587 8.07162 11.7114 8.19696 11.8043 8.28953C11.8971 8.38211 12.0226 8.43452 12.1537 8.43547C12.2848 8.43642 12.411 8.38583 12.5052 8.29461L14.1212 6.67261C15.3952 5.39328 15.5552 3.35128 14.3232 2.11395C13.0899 0.875945 11.0519 1.03728 9.77655 2.31661L6.54588 5.56128C5.27188 6.84061 5.11188 8.88261 6.34388 10.1193C6.3899 10.1671 6.44498 10.2053 6.50592 10.2317C6.56685 10.258 6.63243 10.272 6.69881 10.2727C6.76519 10.2734 6.83105 10.2609 6.89255 10.2359C6.95405 10.2109 7.00996 10.1739 7.05701 10.1271C7.10406 10.0803 7.14132 10.0245 7.1666 9.96315C7.19189 9.90177 7.20469 9.83597 7.20428 9.76959C7.20386 9.7032 7.19023 9.63757 7.16418 9.57651C7.13813 9.51545 7.10018 9.46018 7.05255 9.41394C6.27655 8.63528 6.29788 7.22728 7.25455 6.26728L10.4859 3.02261Z"
            fill="#2DE6FF"/>
        <path
            d="M9.65665 6.74667C9.56294 6.6527 9.43573 6.5998 9.30302 6.59961C9.17031 6.59942 9.04296 6.65196 8.94898 6.74567C8.85501 6.83938 8.80211 6.96659 8.80192 7.0993C8.80173 7.23201 8.85427 7.35936 8.94798 7.45334C9.72398 8.23201 9.70331 9.63934 8.74598 10.6L5.51465 13.844C4.55798 14.804 3.15931 14.824 2.38531 14.0467C1.60931 13.268 1.63065 11.86 2.58731 10.9L4.20331 9.27801C4.24967 9.23147 4.28641 9.17627 4.31143 9.11554C4.33645 9.05481 4.34926 8.98975 4.34914 8.92406C4.34902 8.85838 4.33596 8.79337 4.31071 8.73273C4.28546 8.6721 4.24851 8.61703 4.20198 8.57067C4.15545 8.52432 4.10024 8.48758 4.03951 8.46256C3.97878 8.43754 3.91372 8.42472 3.84804 8.42485C3.78236 8.42497 3.71734 8.43803 3.65671 8.46328C3.59607 8.48853 3.541 8.52547 3.49465 8.57201L1.87865 10.194C0.604647 11.474 0.444647 13.5153 1.67665 14.7527C2.90998 15.9913 4.94798 15.8293 6.22331 14.55L9.45465 11.3053C10.7286 10.0267 10.8886 7.98334 9.65665 6.74667Z"
            fill="#2DE6FF"/>
    </svg>
);

const socialArr = [
    {
        icon: 'xcom',
    },
    {
        icon: 'facebook',
    },
    {
        icon: 'tiktok',
    },
    {
        icon: 'copy',
    },
]
const CreateVideoTemplate = () => {
    // const [togglePopover, setTogglePopover] = useState(false)
    //
    // const handleToggle = () => {
    //     setTogglePopover(!togglePopover);
    // }

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
                    <Box>
                        <DropZone/>
                    </Box>
                    <Box className={styles.section__social}>
                        <Typography variant="body2">
                            or
                        </Typography>
                        <Typography variant="body2">
                            Browse from Social Media
                        </Typography>
                        <Box className={styles.section__social_input}>
                            <CustomTextField
                                id="outlined-basic"
                                label={
                                    <div className={styles.svg}>
                                        <CustomIcon/>
                                        Put the link
                                    </div>
                                }
                                variant="outlined"
                                className={styles.input}
                            />
                        </Box>
                    </Box>
                    <Box className={styles.section__btn}>
                        <Box className='btnGradient2'>
                            <Button variant="contained" className='btn-second'>
                                Make a Video
                            </Button>
                        </Box>
                    </Box>
                    {/* цей бляок для випадашкипо натисканню  */}
                    {/*<SocialNetworks open={togglePopover} handleToggle={handleToggle}>*/}
                    {/*    <Box  className={styles.wrapper}>*/}
                    {/*        <Typography variant='body2'>*/}
                    {/*            Share on social networks*/}
                    {/*        </Typography>*/}
                    {/*        <Typography variant='body2'>*/}
                    {/*            and <span>get extra votes</span>*/}
                    {/*        </Typography>*/}
                    {/*        <ul className={styles.list}>*/}
                    {/*            {socialArr && socialArr.map((item) => (*/}
                    {/*                <li key={item.icon}>*/}
                    {/*                    <IconButton*/}
                    {/*                        size="large"*/}
                    {/*                        edge="start"*/}
                    {/*                        color="inherit"*/}
                    {/*                        aria-label='social'*/}
                    {/*                        className={`iconBtn ${styles.list__iconBtn}`}*/}
                    {/*                    >*/}
                    {/*                        <Image*/}
                    {/*                            src={`/images/icon/${item.icon}.svg`}*/}
                    {/*                            alt={item.icon}*/}
                    {/*                            width={40}*/}
                    {/*                            height={40}*/}
                    {/*                        />*/}
                    {/*                    </IconButton>*/}
                    {/*                </li>*/}
                    {/*            ))}*/}
                    {/*        </ul>*/}
                    {/*    </Box>*/}
                    {/*</SocialNetworks>*/}
                </Box>
            </Box>
        </Box>
    );
}

export default CreateVideoTemplate;