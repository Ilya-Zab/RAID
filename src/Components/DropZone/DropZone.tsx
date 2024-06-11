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

    const files = acceptedFiles;
    console.log(files, 'files');
    return (
        <Box {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Box className={styles.icon}>
                <Image
                    src='/images/icon/plus.svg'
                    alt=''
                    width={42}
                    height={42}
                />
            </Box>
            <Typography variant="h6" className={styles.text}>
                Drag & drop or <span className={styles.text__gradient}>browse</span> your files
            </Typography>
            <Typography variant="h6" className={styles.text__sub}>
                Choose from your device
            </Typography>
        </Box>
    );
}

export default DropZone;
