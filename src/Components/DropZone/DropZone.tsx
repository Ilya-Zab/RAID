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
    console.log(files, 'files');
    return (
        <Box {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Box className={styles.icon}>
                <Typography variant="h6" className={styles.text}>
                    Upload
                </Typography>
            </Box>
            <Typography variant="h6" className={styles.text__sub}>
                Drag & drop or browse your files
            </Typography>
            <Box className={styles.customInput}>
                <Box title={files ? files.name :'Browse'}>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.9484 2.025L11.9043 1.95505L10.9843 0.497379L11.9484 2.025ZM11.9484 2.025H12.0311M11.9484 2.025H12.0311M12.0311 2.025H13.9259C14.1775 2.025 14.4267 2.07724 14.6596 2.17897C14.8925 2.28071 15.1046 2.43006 15.2837 2.61891C15.4627 2.80778 15.6052 3.03242 15.7025 3.28021C15.7998 3.52801 15.85 3.79386 15.85 4.0625V12.8125C15.85 13.0811 15.7998 13.347 15.7025 13.5948C15.6052 13.8426 15.4627 14.0672 15.2837 14.2561C15.1046 14.4449 14.8925 14.5943 14.6596 14.696C14.4267 14.7978 14.1775 14.85 13.9259 14.85H2.07407C1.56643 14.85 1.07786 14.6374 0.716333 14.2561C0.35455 13.8745 0.15 13.3554 0.15 12.8125V4.0625C0.15 3.51962 0.35455 3.00048 0.716333 2.61891C1.07786 2.23762 1.56643 2.025 2.07407 2.025H3.96815H4.05082L4.09497 1.9551L5.01565 0.497379C5.08405 0.389262 5.17617 0.301507 5.28321 0.24122C5.3902 0.180964 5.50909 0.149813 5.6294 0.150001H5.62963L10.3704 0.150001L10.3706 0.150001M12.0311 2.025L10.3706 0.150001M5.62963 0H10.3704H5.62963ZM5.62963 0C5.48312 -0.000228003 5.33884 0.0377385 5.2096 0.110523M5.62963 0L5.2096 0.110523M10.3706 0.150001C10.4909 0.149813 10.6098 0.180964 10.7168 0.24122C10.8238 0.301482 10.9159 0.389189 10.9843 0.497242L10.3706 0.150001ZM5.2096 0.110523C5.08037 0.183308 4.9702 0.288653 4.88889 0.417189L5.2096 0.110523ZM4.44468 3.6H4.44444H2.07407C1.95305 3.6 1.83872 3.65078 1.75571 3.73832C1.67296 3.8256 1.62778 3.94234 1.62778 4.0625V12.8125C1.62778 12.9327 1.67296 13.0494 1.75571 13.1367C1.83872 13.2242 1.95305 13.275 2.07407 13.275H13.9259C14.0469 13.275 14.1613 13.2242 14.2443 13.1367C14.327 13.0494 14.3722 12.9327 14.3722 12.8125V4.0625C14.3722 3.94234 14.327 3.8256 14.2443 3.73832C14.1613 3.65078 14.0469 3.6 13.9259 3.6H11.5556L11.5553 3.6C11.435 3.60019 11.3161 3.56904 11.2091 3.50878C11.1021 3.44849 11.01 3.36074 10.9416 3.25262L10.0209 1.7949L9.97675 1.725H9.89407H6.10519H6.02247L5.97833 1.79495L5.05842 3.25262C4.99003 3.36074 4.8979 3.44849 4.79086 3.50878C4.68387 3.56904 4.56498 3.60019 4.44468 3.6ZM2.07407 3.75H4.44444L10.8148 3.33281C10.8961 3.46135 11.0063 3.56669 11.1355 3.63948C11.2648 3.71226 11.4091 3.75023 11.5556 3.75H13.9259C14.0045 3.75 14.0799 3.78292 14.1354 3.84153C14.191 3.90013 14.2222 3.97962 14.2222 4.0625V12.8125C14.2222 12.8954 14.191 12.9749 14.1354 13.0335C14.0799 13.0921 14.0045 13.125 13.9259 13.125H2.07407C1.99549 13.125 1.92013 13.0921 1.86456 13.0335C1.80899 12.9749 1.77778 12.8954 1.77778 12.8125V4.0625C1.77778 3.97962 1.80899 3.90013 1.86456 3.84153C1.92013 3.78292 1.99549 3.75 2.07407 3.75ZM8.88889 9.225H8.73889V9.375V10.9375C8.73889 11.1489 8.65921 11.3501 8.51969 11.4972C8.38043 11.6441 8.19331 11.725 8 11.725C7.80669 11.725 7.61957 11.6441 7.48031 11.4972C7.34079 11.3501 7.26111 11.1489 7.26111 10.9375V9.375V9.225H7.11111H5.62963C5.43632 9.225 5.2492 9.14408 5.10994 8.99721C4.97042 8.85006 4.89074 8.64886 4.89074 8.4375C4.89074 8.22614 4.97042 8.02494 5.10994 7.87779C5.2492 7.73092 5.43632 7.65 5.62963 7.65H7.11111H7.26111V7.5V5.9375C7.26111 5.72614 7.34079 5.52494 7.48031 5.37779C7.61957 5.23092 7.80669 5.15 8 5.15C8.19331 5.15 8.38043 5.23092 8.51969 5.37779C8.65921 5.52494 8.73889 5.72614 8.73889 5.9375V7.5V7.65H8.88889H10.3704C10.5637 7.65 10.7508 7.73092 10.8901 7.87779C11.0296 8.02494 11.1093 8.22614 11.1093 8.4375C11.1093 8.64886 11.0296 8.85006 10.8901 8.99721C10.7508 9.14408 10.5637 9.225 10.3704 9.225H8.88889Z"
                            fill="#2DE6FF" stroke="#0D2C69" stroke-width="0.3"/>
                    </svg>
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
                            <stop stop-color="#08A232"/>
                            <stop offset="0.333333" stop-color="#2DE6FF"/>
                            <stop offset="0.666667" stop-color="#3B57ED"/>
                            <stop offset="1" stop-color="#916AFF"/>
                        </linearGradient>
                    </defs>
                </svg>
            </Box>
        </Box>
    );
}

export default DropZone;
