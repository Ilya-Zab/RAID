import * as React from "react";
import styles from './styles.module.scss';
import { Box, Button, Typography } from "@mui/material";
import Image from 'next/image';
import { RegistrationForm } from "../Forms/RegistrationForm";
import { useCookies } from "react-cookie";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import useCreateCreative from "@/hooks/useCreateCreative";
import { FinallyVideoSend } from "./FinallyVideoSend";
import { useCreateWpMedia } from "@/hooks/useCreateWpMedia";

const FinallyVideoTemplate = ({ video, creativeImage }) =>
{
    const [cookies] = useCookies(['userToken']);
    const raidId = useAppSelector(state => state.raidId.raidId);
    const router = useRouter();
    const { createCreativeAsBlob, success, data, error } = useCreateCreative();
    const [isCreating, setCreating] = React.useState(false);
    const { isLoading: isMediaLoading, data: wpMediaResponse, error: wpMediaError, createWpMedia } = useCreateWpMedia();
    const [imageId, setImageId] = React.useState();
    React.useEffect(() =>
    {
        if (!raidId && !cookies.userToken)
        {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raidId, cookies]);

    React.useEffect(() =>
    {
        createWpMedia(creativeImage.frameBlob);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creativeImage]);

    React.useEffect(() =>
    {
        if (wpMediaResponse && "mediaItem" in wpMediaResponse)
        {
            console.log(wpMediaResponse.mediaItem.id);
            setImageId(wpMediaResponse.mediaItem.id);
        }

        if (wpMediaError)
        {
            console.log(wpMediaError);
        }
    }, [wpMediaResponse, wpMediaError])

    const createCreative = () =>
    {
        setCreating(true);
        createCreativeAsBlob(video);
    }

    React.useEffect(() =>
    {
        if (success)
        {
            alert('Creative has been created');
            setCreating(false);
        }

        if (error)
        {
            alert('There is a problem with creating creative');
            setCreating(false);
        }
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
                        <Typography variant='h1'>
                            UserName
                        </Typography>
                    </Box>
                    <Box className={styles.section__text}>
                        <Typography variant='body1' align='center'>Well done!</Typography>
                        <Typography variant='body2' align='center'>
                            Here&lsquo;s your special in-game promo code <br /> for submitting your entry: <span className='text-gradient'>promocode</span>
                        </Typography>
                        <Typography variant='caption'>
                            Enter your email to participate in a prize draw.<br />
                            We&lsquo;ll use it to notify you once your post <br />
                            successfully passed moderation and published*.
                        </Typography>
                    </Box>
                    {!cookies.userToken && <RegistrationForm onSendForm={createCreative} isCreating={isCreating} />}
                    {cookies.userToken && <FinallyVideoSend onButtonClick={createCreative} isCreating={isCreating} />}
                </Box>
            </Box>
        </Box >
    );
}

export default FinallyVideoTemplate;