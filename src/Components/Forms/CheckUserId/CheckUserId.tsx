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

export const transformRaidId = (raidId) =>
{
    let newStr = raidId.replace(" | ", " ");
    return newStr;
}

export const CheckUserId: FC = () =>
{
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckUserId>({
        resolver: zodResolver(CheckUserIdSchema)
    });

    const [fetchUserToken] = useFetchUserTokenMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit = async ({ raidId }: CheckUserId) =>
    {
        setIsSubmitting(true);
        setIsUserRegistered(false);

        try
        {
            const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();

            if (userToken)
            {
                setIsUserRegistered(true);
                setIsSubmitting(false);
            }
        } catch (error)
        {
            dispatch(setRaidId(transformRaidId(raidId)));
            // router.push('/create-video');
        } finally
        {
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
                {isUserRegistered && <p className={styles.form__error}>
                    Raid ID is already registered.</p>}
            </form>
        </Box>
    );
}
