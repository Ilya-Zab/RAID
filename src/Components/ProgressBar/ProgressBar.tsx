import React from "react";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Box} from "@mui/material";
import styles from './styles.module.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        background: 'rgba(66, 113, 161, 0.28)',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        background: 'linear-gradient(170deg, #1fffff 0%, #23ff5f 36.5%, #ffb82d 100%)',
    },
}));
const ProgressBar = ({value}) => {
    const normalizedValue = ((value - 2) / 4) * 100;
    return (
        <Box className={styles.wrapper}>
            <BorderLinearProgress variant="determinate" value={normalizedValue} />
        </Box>
    )
}
ProgressBar.defaultProps  = {
    value: 2,
}

export default ProgressBar;