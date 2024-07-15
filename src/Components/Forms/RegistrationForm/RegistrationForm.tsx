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
import { Loader } from "@/Components/Layouts/Loader";

const RegistrationFormSchema = z.object({
    email: z.string().email('Please, type valid email'),
});

type RegistrationForm = z.infer<typeof RegistrationFormSchema>;

interface RegistrationFormProps
{
    onSendForm?: () => void;
    isCreating?: boolean;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onSendForm, isCreating }) =>
{
    const [registerForm, { data, isError, error }] = useRegisterUserMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const [cookie, setCookie] = useCookies(['userToken', 'raidId']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { raidId } = useAppSelector(state => state.raidId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationForm>({
        resolver: zodResolver(RegistrationFormSchema)
    });

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
                const userToken = await fetchUserToken({ username: cookie.raidId, password: cookie.raidId }).unwrap();
                const expiresDate = new Date();
                expiresDate.setTime(expiresDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                setCookie('userToken', userToken.token, { path: '/', expires: expiresDate });
                onSendForm();
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
            <span className={`${styles.info} ${styles.form__link} ${styles.form__link_regis}`}>
                *It may take us up to 5 business days.
            </span>
            <div className={styles.wrapper}>
                {isCreating && < Loader className={styles.popup__loader} color="white" />}
                <Button
                    type="submit"
                    variant="contained"
                    className={`btn-second ${styles.form__public}`}
                    disabled={isSubmitting || isCreating}
                >
                    {(isSubmitting || isCreating) ? 'Publishing...' : 'Publish'}
                </Button>
            </div>
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