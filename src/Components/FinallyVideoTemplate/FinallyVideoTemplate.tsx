import * as React from "react";
import styles from './styles.module.scss';
import { Box, Button, Typography } from "@mui/material";
import Image from 'next/image';
import { RegistrationForm } from "../Forms/RegistrationForm";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import useCreateCreative from "@/hooks/useCreateCreative";
import { FinallyVideoSend } from "./FinallyVideoSend";
import { useCreateWpMedia } from "@/hooks/useCreateWpMedia";
import { setVideo } from "@/store/slice/videoSlice";
import { setCreativeName } from "@/store/slice/creativeSlice";
import { trimString } from "@/utils/trimString";

const FinallyVideoTemplate = ({ video, creativeImage }) => {
    const [cookies] = useCookies(['userToken']);
    const raidId = useAppSelector(state => state.raidId.raidId);
    const creativeName = useAppSelector(state => state.creative.creativeName);
    const router = useRouter();
    const { createCreativeAsBlob, uploadVideoByUserToken, success, data, error } = useCreateCreative();
    const [isCreating, setCreating] = React.useState(false);
    const { isLoading: isMediaLoading, data: wpMediaResponse, error: wpMediaError, createWpMedia } = useCreateWpMedia();
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (!raidId && !cookies.userToken) {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raidId, cookies]);

    function onCreateClick() {
        setCreating(true);
        createWpMedia(creativeImage.frameBlob);
    }

    React.useEffect(() => {
        if (wpMediaResponse && "mediaItem" in wpMediaResponse && creativeName) {
            uploadVideoByUserToken(video, wpMediaResponse.mediaItem.id, creativeName);
        }

        if (wpMediaError) {
            console.error(wpMediaError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wpMediaResponse, wpMediaError]);

    React.useEffect(() => {
        if (success) {
            router.push('/preview');
            setCreating(false);
            dispatch(setVideo(null));
            dispatch(setCreativeName(null));
        }

        if (error) {
            alert('There is a problem with creating creative');
            alert(error);
            setCreating(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, error]);

    return (
        <Box className={styles.bg}>
            <Box className={styles.container}>
                <Box className={styles.section}>
                    <Box className={styles.section__photo}>
                        <Image
                            src={creativeImage.frameUrl}
                            alt='User Photo'
                            width={136}
                            height={243}
                            className={styles.photo}
                        />
                        <div className={`text-gradient ${styles['section__photo-name']}`}>
                            {creativeName && trimString(creativeName, 12)}
                        </div>

                    </Box>
                    <Box className={styles.section__text}>
                        <Typography variant='body1' align='center'>Well done!</Typography>
                        <Typography variant='caption'>
                            Enter your email to participate in a prize draw.<br />
                            We&lsquo;ll use it to notify you once your post <br />
                            successfully passed moderation and published*.
                        </Typography>
                    </Box>
                    {!cookies.userToken && <RegistrationForm onSendForm={onCreateClick} isCreating={isCreating} />}
                    {cookies.userToken && <FinallyVideoSend onButtonClick={onCreateClick} isCreating={isCreating} />}
                </Box>
            </Box>
        </Box >
    );
}

export default FinallyVideoTemplate;