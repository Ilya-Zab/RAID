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

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleClick = () =>
    {
        if (!isButtonDisabled)
        {
            onChange();
            setIsButtonDisabled(true);
            setTimeout(() =>
            {
                setIsButtonDisabled(false);
            }, 2000);
        }
    };

    return (
        <Box className={`${styles.switch} ${className && className}`}>
            <button
                className={`btn-reset ${styles.switch__button} ${!isPhoto && styles.switch__button_checked}`}
                disabled={isButtonDisabled}
                onClick={handleClick}
            >
                VIDEO
            </button>
            <button
                className={`btn-reset ${styles.switch__button} ${isPhoto && styles.switch__button_checked}`}
                disabled={isButtonDisabled}
                onClick={handleClick}
            >
                PHOTO
            </button>
        </Box >
    )
}
