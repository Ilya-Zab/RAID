
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import variable from '@/styles/variables.module.scss';
import { LoaderProps } from "@/types/components/Layouts/Loader";
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
export const Loader: FC<LoaderProps> = ({ className, thickness, size, color, progress }) =>
{
    const [currentProgress, setCurrentProgress] = useState(0);
    const [targetProgress, setTargetProgress] = useState(progress);

    useEffect(() =>
    {
        setTargetProgress(progress);
    }, [progress]);

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setCurrentProgress((prevProgress) =>
            {
                if (prevProgress < targetProgress)
                {
                    return prevProgress + 1;
                } else
                {
                    clearInterval(interval);
                    return prevProgress;
                }
            });
        }, 10000 / (targetProgress - currentProgress));

        return () => clearInterval(interval);
    }, [targetProgress, currentProgress]);

    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 100,
                background: variable.bg4,
                alignItems: 'center',
                minHeight: "auto",
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '10%',
            }}
            className={className}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    size={size}
                    thickness={thickness}
                    value={currentProgress}
                    sx={{
                        color: color ? color : variable.accent,
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="white"
                    >{currentProgress}%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '30px', fontSize: '12px', textAlign: 'center' }}>
                <span>If any problem occurs, send your work to</span>
                <a className="text-gradient text-gradient_alt" href={"mailto:support@wefinallyplayedit.com"}> support@wefinallyplayedit.com </a><br />
                <span>to our team will help to publish it!</span>
            </Box>
        </Box>
    )
}
