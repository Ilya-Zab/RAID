
import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import variable from '@/styles/variables.module.scss';
import { LoaderProps } from "@/types/components/Layouts/Loader";
export const Loader: FC<LoaderProps> = ({ className, thickness, size, color }) =>
{
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                paddingTop: '10%',
            }}
            className={className}
        >
            <CircularProgress
                size={size}
                thickness={thickness}
                sx={{
                    color: color ? color : variable.accent,
                }}
            />
        </Box>
    )
}
