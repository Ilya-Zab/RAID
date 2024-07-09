import { Box, Button } from "@mui/material";
import { FC } from "react";
import styles from './styles.module.scss';

interface FinallyVideoSendProps
{
    onButtonClick: () => void;
    isCreating: boolean;
}

export const FinallyVideoSend: FC<FinallyVideoSendProps> = ({ onButtonClick, isCreating }) =>
{
    return (
        <Box>
            <span className={styles.info}>
                *It may take us up to 5 business days.
            </span>
            <Button
                type="submit"
                variant="contained"
                className={`btn-second ${styles.section__btn}`}
                onClick={onButtonClick}
                disabled={isCreating}
            >
                {isCreating ? 'Publishing...' : 'Publish'}
            </Button>
        </Box>
    )
}