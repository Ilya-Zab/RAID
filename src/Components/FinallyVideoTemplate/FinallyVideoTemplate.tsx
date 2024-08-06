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
import { setCreativeName, setLoading } from "@/store/slice/creativeSlice";
import { trimString } from "@/utils/trimString";
import { Loader } from "@/Components/Layouts/Loader";

const FinallyVideoTemplate = ({ video, creativeImage, changeProgress }) =>
{
    const [cookies] = useCookies(['userToken']);
    const raidId = useAppSelector(state => state.raidId.raidId);
    const creativeName = useAppSelector(state => state.creative.creativeName);
    const router = useRouter();
    const { uploadVideoByUserToken, uploadPictureByUserToken, success, data, error } = useCreateCreative();
    const isCreating = useAppSelector(state => state.creative.isLoading);
    const { isLoading: isMediaLoading, data: wpMediaResponse, error: wpMediaError, createWpMedia } = useCreateWpMedia();
    const dispatch = useAppDispatch();
    React.useEffect(() =>
    {
        if (!raidId && !cookies.userToken)
        {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raidId, cookies]);

    function onCreateClick()
    {
        if (video)
        {
            dispatch(setLoading(true));
            changeProgress(50);
            createWpMedia(creativeImage.frameBlob);
        } else
        {
            dispatch(setLoading(true));
            changeProgress(70);
            uploadPictureByUserToken(creativeImage.frameBlob, creativeName);
        }
    }

    React.useEffect(() =>
    {
        if (creativeName && wpMediaResponse && "mediaItem" in wpMediaResponse)
        {
            changeProgress(70);
            if (video)
                uploadVideoByUserToken(video, wpMediaResponse.mediaItem.id, creativeName);
        }

        if (wpMediaError)
        {
            console.error(wpMediaError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wpMediaResponse, wpMediaError]);

    React.useEffect(() =>
    {
        if (success)
        {
            router.push('/preview');
            dispatch(setVideo(null));
            dispatch(setLoading(false));
            changeProgress(100);
            dispatch(setCreativeName(null));
        }

        if (error)
        {
            alert('There is a problem with adding creative');
            alert(error);
            changeProgress(100);
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
                            unoptimized
                        />
                        <div className={`text-gradient ${styles['section__photo-name']}`}>
                            {creativeName && trimString(creativeName, 12)}
                        </div>

                    </Box>
                    <Box className={styles.section__text}>
                        <Typography variant='body1' align='center'>Well done!</Typography>
                        <Typography variant='caption'>
                            Enter your email to reedeem your instant reward<br />
                            for participation and join a prize draw.<br />
                            We&lsquo;ll also use it to notify you once your post<br />
                            has successfully passed moderation and been published.
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