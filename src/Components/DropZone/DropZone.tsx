import * as React from 'react';
import styles from './styles.module.scss';
import {useDropzone} from 'react-dropzone';
import {Box, Typography} from "@mui/material";
import Image from 'next/image';

function DropZone() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        accept: {
            'video/*': [],
        }
    });

    const files = acceptedFiles[0];
    return (
        <Box {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Box className={styles.icon}>
                <Typography variant="h6" className={styles.text__sub}>
                    Show how your life was divided into Before and After playing Raid!
                </Typography>
                <Typography variant="h6" className={styles.text__sub}>
                    Create a photo/video using our filter or upload a ready-made one
                </Typography>
                <Typography variant="h6" className={styles.text}>
                    Upload
                </Typography>
            </Box>
            <Typography variant="h6" className={styles.text__sub}>
                Drag & drop or browse your files
            </Typography>
            <Box className={styles.customInput}>
                <Box title={files ? files.name :'Browse'}>
                    <Image
                        src='/images/icon/photo.svg'
                        alt=''
                        width={16}
                        height={15}
                    />
                    <span style={files ? {width: '160px'} : {width: '79px'}}>
                        {files ? files.name :'Browse'}
                    </span>
                </Box>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.5 0H2.5C1.83696 0 1.20107 0.263392 0.732233 0.732233C0.263392 1.20107 0 1.83696 0 2.5V22.5C0 23.163 0.263392 23.7989 0.732233 24.2678C1.20107 24.7366 1.83696 25 2.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V2.5C25 1.83696 24.7366 1.20107 24.2678 0.732233C23.7989 0.263392 23.163 0 22.5 0ZM22 22H3V3H22V22ZM6 12.5C6 12.1022 6.15804 11.7206 6.43934 11.4393C6.72064 11.158 7.10218 11 7.5 11H13.875L12.435 9.56125C12.2955 9.42172 12.1848 9.25607 12.1093 9.07377C12.0338 8.89147 11.9949 8.69607 11.9949 8.49875C11.9949 8.30142 12.0338 8.10603 12.1093 7.92373C12.1848 7.74143 12.2955 7.57578 12.435 7.43625C12.5745 7.29672 12.7402 7.18604 12.9225 7.11053C13.1048 7.03501 13.3002 6.99615 13.4975 6.99615C13.6948 6.99615 13.8902 7.03501 14.0725 7.11053C14.2548 7.18604 14.4205 7.29672 14.56 7.43625L18.56 11.4362C18.6998 11.5756 18.8108 11.7412 18.8865 11.9235C18.9622 12.1058 19.0012 12.3013 19.0012 12.4987C19.0012 12.6962 18.9622 12.8917 18.8865 13.074C18.8108 13.2563 18.6998 13.4219 18.56 13.5613L14.56 17.5613C14.4205 17.7008 14.2548 17.8115 14.0725 17.887C13.8902 17.9625 13.6948 18.0014 13.4975 18.0014C13.3002 18.0014 13.1048 17.9625 12.9225 17.887C12.7402 17.8115 12.5745 17.7008 12.435 17.5613C12.2955 17.4217 12.1848 17.2561 12.1093 17.0738C12.0338 16.8915 11.9949 16.6961 11.9949 16.4988C11.9949 16.3014 12.0338 16.106 12.1093 15.9237C12.1848 15.7414 12.2955 15.5758 12.435 15.4363L13.875 14H7.5C7.10218 14 6.72064 13.842 6.43934 13.5607C6.15804 13.2794 6 12.8978 6 12.5Z"
                        fill="url(#paint0_linear_697_208)"/>
                    <defs>
                        <linearGradient id="paint0_linear_697_208" x1="6.82617" y1="-16.3564" x2="27.9002" y2="-16.1558"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#08A232"/>
                            <stop offset="0.333333" stopColor="#2DE6FF"/>
                            <stop offset="0.666667" stopColor="#3B57ED"/>
                            <stop offset="1" stopColor="#916AFF"/>
                        </linearGradient>
                    </defs>
                </svg>
            </Box>
        </Box>
    );
}

export default DropZone;
