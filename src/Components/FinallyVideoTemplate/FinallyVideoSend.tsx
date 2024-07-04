import { Box, Button } from "@mui/material";
import { FC } from "react";

interface FinallyVideoSendProps
{
    onButtonClick: () => void;
    isCreating: boolean;
}

export const FinallyVideoSend: FC<FinallyVideoSendProps> = ({ onButtonClick, isCreating }) =>
{
    return (
        <Box>
            <span className="info">
                *It make take us up to 5 business days.
            </span>
            <Button
                type="submit"
                variant="contained"
                className={`btn-second`}
                onClick={onButtonClick}
                disabled={isCreating}
            >
                {isCreating ? 'Publishing...' : 'Publish'}
            </Button>
        </Box>
    )
}