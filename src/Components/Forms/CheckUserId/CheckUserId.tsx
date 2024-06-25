import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyFetchUserQuery, useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import styles from '../Formstyles/styles.module.scss';
import { Box } from "@mui/material";
import { CustomInput } from "../CustomInput";
import Link from "next/link";
import { validateRaidId } from "@/utils/validateRaidId";
import { useAppDispatch } from "@/hooks/redux";
import { setRaidId } from "@/store/slice/raidIdSlice";
// UM143785687 | 138407071 

const CheckUserIdSchema = z.object({
    raidId: z.string().refine(value => validateRaidId(value), {
        message: "Invalid raid ID",
    }),
    country: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    }),
    terms: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    }),
});

type CheckUserId = z.infer<typeof CheckUserIdSchema>;

export const CheckUserId: FC = () =>
{
    const [fetchUserToken, { data, isError, error }] = useFetchUserTokenMutation();
    const [getUserInfo, { data: user }] = useLazyFetchUserQuery();
    const [cookies, setCookie] = useCookies(['userToken']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckUserId>({
        resolver: zodResolver(CheckUserIdSchema)
    });

    const onSubmit = async ({ raidId }: CheckUserId) =>
    {
        setIsSubmitting(true);

        const body = {
            username: raidId,
        };

        dispatch(setRaidId(raidId));
        router.push('/create-video');

        try
        {
            const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();

            if (userToken)
            {
                console.log(raidId);
            }
        } catch (error)
        {
            console.error('Error:', error);
        } finally
        {
            setIsSubmitting(false);
            reset();
        }
    };

    return (
        <Box className="subtract-box">
            <h2 className={styles.form__title}>30 days of raid</h2>
            <h3 className={styles.form__subTitle}>with RAID: Shadow Legends</h3>
            <h3 className={styles.form__desc}>Need description here about event!</h3>
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
                    className={styles.form__input}
                />
                <Link
                    className={styles.form__link}
                    href={"/"}>
                    Where can I find my RAID ID?
                </Link>
                <CustomInput
                    fieldName={'I confirm that I am a US citizen (outside New York and Florida)'}
                    name={'country'}
                    register={register}
                    isCheckbox={true}
                    errors={errors}
                />
                <CustomInput
                    fieldName={"I agree to this event's Official Rules and Privacy notice"}
                    name={'terms'}
                    register={register}
                    isCheckbox={true}
                    errors={errors}
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
