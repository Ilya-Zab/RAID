import * as React from "react";
import styles from './styles.module.scss';
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import Image from 'next/image';
import DropZone from "@/Components/DropZone/DropZone";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import { setVideo } from "@/store/slice/videoSlice";
import { useAppDispatch } from "@/hooks/redux";
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
            fill="#2DE6FF" />
        <path
            d="M9.65665 6.74667C9.56294 6.6527 9.43573 6.5998 9.30302 6.59961C9.17031 6.59942 9.04296 6.65196 8.94898 6.74567C8.85501 6.83938 8.80211 6.96659 8.80192 7.0993C8.80173 7.23201 8.85427 7.35936 8.94798 7.45334C9.72398 8.23201 9.70331 9.63934 8.74598 10.6L5.51465 13.844C4.55798 14.804 3.15931 14.824 2.38531 14.0467C1.60931 13.268 1.63065 11.86 2.58731 10.9L4.20331 9.27801C4.24967 9.23147 4.28641 9.17627 4.31143 9.11554C4.33645 9.05481 4.34926 8.98975 4.34914 8.92406C4.34902 8.85838 4.33596 8.79337 4.31071 8.73273C4.28546 8.6721 4.24851 8.61703 4.20198 8.57067C4.15545 8.52432 4.10024 8.48758 4.03951 8.46256C3.97878 8.43754 3.91372 8.42472 3.84804 8.42485C3.78236 8.42497 3.71734 8.43803 3.65671 8.46328C3.59607 8.48853 3.541 8.52547 3.49465 8.57201L1.87865 10.194C0.604647 11.474 0.444647 13.5153 1.67665 14.7527C2.90998 15.9913 4.94798 15.8293 6.22331 14.55L9.45465 11.3053C10.7286 10.0267 10.8886 7.98334 9.65665 6.74667Z"
            fill="#2DE6FF" />
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

const CreateVideoTemplateSchema = z.object({
    handleButtonClick: z.function().args(z.number()).returns(z.void())
})


type CreateVideoTemplateProps = z.infer<typeof CreateVideoTemplateSchema>;

const CreateVideoTemplate: React.FC<CreateVideoTemplateProps> = ({ handleButtonClick }) =>
{
    const [url, setUrl] = React.useState();
    const dispatch = useAppDispatch();

    async function getVideoUrl(url: string)
    {
        return await axios("/api/rapid", {
            params: {
                url
            }
        })
            .then(response => response.data.url)
            .catch(err => alert(JSON.stringify(err.response.data)));
    }

    async function getVideo(url: string): Promise<Blob>
    {
        try
        {
            const response = await axios.get(url, {
                responseType: "blob"
            });
            console.log(response);
            return response.data;
        } catch (err)
        {
            console.error(`Error while downloading video. URL: "${url}".`);
            throw err;
        }
    }

    const onInputChange = (event) =>
    {
        if (event.target)
        {
            console.log(event.target.value);
            setUrl(event.target.value);
        }
    }

    const onSocialClick = async () =>
    {
        if (url)
        {
            const videoUrl = await getVideoUrl(url);
            const rapidVideo = await getVideo(videoUrl);
            if (rapidVideo)
                dispatch(setVideo(rapidVideo));
        }

    }

    return (

        <Box className={styles.section}>
            <Box className={styles.section__zone}>
                <DropZone />
            </Box>
            <Box className={styles.section__social}>
                <Typography variant="body2">
                    Browse from Social Media
                </Typography>
                <Box className={styles.section__social__input}>
                    <input
                        type='url'
                        className={styles.section__social__input__customInput}
                        placeholder={'Put the link'}
                        onChange={() => onInputChange(event)}
                        value={url}
                    />
                    <button
                        type='button'
                        onClick={onSocialClick}
                    >
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.5 0H2.5C1.83696 0 1.20107 0.263392 0.732233 0.732233C0.263392 1.20107 0 1.83696 0 2.5V22.5C0 23.163 0.263392 23.7989 0.732233 24.2678C1.20107 24.7366 1.83696 25 2.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V2.5C25 1.83696 24.7366 1.20107 24.2678 0.732233C23.7989 0.263392 23.163 0 22.5 0ZM22 22H3V3H22V22ZM6 12.5C6 12.1022 6.15804 11.7206 6.43934 11.4393C6.72064 11.158 7.10218 11 7.5 11H13.875L12.435 9.56125C12.2955 9.42172 12.1848 9.25607 12.1093 9.07377C12.0338 8.89147 11.9949 8.69607 11.9949 8.49875C11.9949 8.30142 12.0338 8.10603 12.1093 7.92373C12.1848 7.74143 12.2955 7.57578 12.435 7.43625C12.5745 7.29672 12.7402 7.18604 12.9225 7.11053C13.1048 7.03501 13.3002 6.99615 13.4975 6.99615C13.6948 6.99615 13.8902 7.03501 14.0725 7.11053C14.2548 7.18604 14.4205 7.29672 14.56 7.43625L18.56 11.4362C18.6998 11.5756 18.8108 11.7412 18.8865 11.9235C18.9622 12.1058 19.0012 12.3013 19.0012 12.4987C19.0012 12.6962 18.9622 12.8917 18.8865 13.074C18.8108 13.2563 18.6998 13.4219 18.56 13.5613L14.56 17.5613C14.4205 17.7008 14.2548 17.8115 14.0725 17.887C13.8902 17.9625 13.6948 18.0014 13.4975 18.0014C13.3002 18.0014 13.1048 17.9625 12.9225 17.887C12.7402 17.8115 12.5745 17.7008 12.435 17.5613C12.2955 17.4217 12.1848 17.2561 12.1093 17.0738C12.0338 16.8915 11.9949 16.6961 11.9949 16.4988C11.9949 16.3014 12.0338 16.106 12.1093 15.9237C12.1848 15.7414 12.2955 15.5758 12.435 15.4363L13.875 14H7.5C7.10218 14 6.72064 13.842 6.43934 13.5607C6.15804 13.2794 6 12.8978 6 12.5Z"
                                fill="url(#paint0_linear_697_208)" />
                            <defs>
                                <linearGradient id="paint0_linear_697_208" x1="6.82617" y1="-16.3564" x2="27.9002"
                                    y2="-16.1558"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#08A232" />
                                    <stop offset="0.333333" stopColor="#2DE6FF" />
                                    <stop offset="0.666667" stopColor="#3B57ED" />
                                    <stop offset="1" stopColor="#916AFF" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </button>
                </Box>
                <Typography className={styles.section__or} variant="body2">
                    or
                </Typography>
                <Box className={styles.section__btn}>
                    <Box className='btnGradient2'>
                        <Button
                            variant="contained"
                            className='btn-second'
                            onClick={() => handleButtonClick(1)}
                        >
                            Create Content
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateVideoTemplate;