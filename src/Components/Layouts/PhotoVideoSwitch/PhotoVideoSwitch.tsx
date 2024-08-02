import { Box } from "@mui/material";
import { FC, useState } from "react";
import styles from './styles.module.scss';

interface PhotoVideoSwitchProps
{
    className?: string;
    isPhoto: boolean;
    onChange: () => void;
}

export const PhotoVideoSwitch: FC<PhotoVideoSwitchProps> = ({ className, isPhoto, onChange }) =>
{

    return (
        <Box className={`${styles.switch} ${className && className}`}>
            <button
                className={`btn-reset ${styles.switch__button} ${!isPhoto && styles.switch__button_checked}`}
                onClick={onChange}
            >
                VIDEO
            </button>
            <button
                className={`btn-reset ${styles.switch__button} ${isPhoto && styles.switch__button_checked}`}
                onClick={onChange}
            >
                PHOTO
            </button>
        </Box >
    )
}
