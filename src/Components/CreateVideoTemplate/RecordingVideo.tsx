import { FC } from "react";
import * as React from "react";
import styles from './styles.module.scss';
import { Box } from "@mui/material";

export const RecordingVideo: FC = ({ children }) =>
{
    return (
        <Box className={styles.bg}>
            <Box className={styles.container}>
                <Box className={styles.section}>
                </Box>
            </Box>
        </Box>
    )
};