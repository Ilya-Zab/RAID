import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useRouter } from 'next/router';
import styles from '../Formstyles/styles.module.scss';
import { Box } from "@mui/material";
import { CustomInput } from "../CustomInput";
import Link from "next/link";
import { validateRaidId } from "@/utils/validateRaidId";
import { useAppDispatch } from "@/hooks/redux";
import { setRaidId } from "@/store/slice/raidIdSlice";
import { useCookies } from "react-cookie";

const CheckUserIdSchema = z.object({
    raidId: z.string().refine(value => validateRaidId(value), {
        message: "Invalid raid ID",
    }),
    country: z.boolean(),
    terms: z.boolean()
});

type CheckUserId = z.infer<typeof CheckUserIdSchema>;

export const transformRaidId = (raidId) =>
{
    let newStr = raidId.replace(" | ", " ");
    return newStr;
}

export const LoginForm: FC = () =>
{
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckUserId>({
        resolver: zodResolver(CheckUserIdSchema)
    });

    const [fetchUserToken] = useFetchUserTokenMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken', 'raidId']);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [firstCheck, setFirstCheck] = useState<Boolean>(false);
    const [secondCheck, setSecondCheck] = useState<Boolean>(false);

    function onFirstClick()
    {
        if (firstCheck)
        {
            setFirstCheck(false);
        } else
        {
            setFirstCheck(true);
        }

    }

    function onSecondClick()
    {
        if (secondCheck)
        {
            setSecondCheck(false);
        } else
        {
            setSecondCheck(true);
        }
    }

    const onSubmit = async ({ raidId }: CheckUserId) =>
    {
        if (!secondCheck || !firstCheck)
        {
            alert('You must accept the Official Rules.')
            return;
        }
        const transformedId = transformRaidId(raidId);
        const expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (7 * 24 * 60 * 60 * 1000));

        try
        {
            setIsSubmitting(true);
            const userToken = await fetchUserToken({ username: transformedId, password: transformedId }).unwrap();

            if (userToken)
            {
                setCookie('userToken', userToken.token, { path: '/', expires: expiresDate });
            }
        } catch (error)
        {
            removeCookie('userToken', { path: '/' });
            removeCookie('raidId', { path: '/' });
            dispatch(setRaidId(transformRaidId(raidId)));
            setCookie('raidId', transformedId, { path: '/', expires: expiresDate });
        } finally
        {
            reset();
            router.push('/gallery');
            setIsSubmitting(false);
        }
    };

    return (
        <Box className={`subtract-box subtract-box_small`}>
            <h2 className={styles.form__title}>
                <span className='text-gradient'>
                    #WeFinallyPlayedIt
                </span>
            </h2>
            <h3 className={styles.form__subTitle}>with RAID: Shadow Legends</h3>
            <h3 className={styles.form__desc}>Submit your content, get votes and win gaming consoles, drones, and more exciting prizes</h3>
            <h3 className={`${styles.form__desc} ${styles.form__desc_zeroM}`}>
                Please enter your RAID PLAYER ID to continue:
            </h3>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    placeholder={'Enter Raid ID here'}
                    name={'raidId'}
                    register={register}
                    errors={errors}
                    className={`${styles.form__input}`}
                />
                <Link
                    className={`info ${styles.form__link}`}
                    href={"/"}>
                    Where can I find my RAID ID?
                </Link>
                <CustomInput
                    fieldName={'I confirm that I am a UK/US citizen (outside of New York and Florida)'}
                    name={'country'}
                    register={register}
                    isCheckbox={true}
                    errors={errors}
                    onClick={onFirstClick}
                />
                <CustomInput
                    fieldName={"I agree to this event's Official Rules and Privacy notice"}
                    name={'terms'}
                    register={register}
                    isCheckbox={true}
                    errors={errors}
                    onClick={onSecondClick}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`hexagon-button hexagon-button_gradient ${styles.form__button}`}
                >
                    {isSubmitting ? 'Wait...' : 'Go!'}
                </button>
            </form>
        </Box>
    );
}
