import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';
import { CustomInput } from "../CustomInput";
import styles from '../Formstyles/styles.module.scss';
import { Button } from "@mui/material";
import { useAppSelector } from "@/hooks/redux";
import { WpWooCustomError } from "@/types/services";

const RegistrationFormSchema = z.object({
    email: z.string().email('Please, type valid email'),
});

type RegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const RegistrationForm: FC = () =>
{
    const [registerForm, { data, isError, error }] = useRegisterUserMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const [_, setCookie] = useCookies(['userToken']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { raidId } = useAppSelector(state => state.raidId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationForm>({
        resolver: zodResolver(RegistrationFormSchema)
    });

    if (raidId)
    {
        console.log(raidId)
    }

    const onSubmit = async ({ email }: RegistrationForm) =>
    {
        setIsSubmitting(true);

        const body = {
            username: raidId,
            email: email,
            password: raidId,
        };

        try
        {
            const response = await registerForm(body);

            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();
                const expiresDate = new Date();
                expiresDate.setTime(expiresDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                setCookie('userToken', userToken.token, { path: '/', expires: expiresDate });
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
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
                placeholder={'Enter Email'}
                name={'email'}
                register={register}
                errors={errors}
                className={styles.form__input}
            />
            <span className={`${styles.form__link} ${styles.form__link_regis}`}>
                *It make take us up to 5 business days.
            </span>
            <Button
                type="submit"
                variant="contained"
                className={`btn-second ${styles.form__public}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>
            <div className={styles.form__res}>
                {isError && error && (
                    <p
                        className={styles.form__error}
                        dangerouslySetInnerHTML={{ __html: (error as WpWooCustomError).data.message }} />
                )}
            </div>
        </form>
    );
}