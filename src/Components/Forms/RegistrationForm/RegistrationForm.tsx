import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';
import { useLazyFetchUserCountryQuery } from "@/store/ipapi/ipapi";
import { CustomInput } from "../CustomInput";
import styles from './styles.module.scss';

const RegistrationFormSchema = z.object({
    raidId: z.string().min(1, 'Please, type your ID'),
    email: z.string().email('Please, type valid email'),
    country: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    }),
    terms: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    }),
});

type RegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const RegistrationForm: FC = () =>
{
    const [registerForm, { data, isError, error }] = useRegisterUserMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const [cookies, setCookie] = useCookies(['userToken']);
    const [checkUserCountry] = useLazyFetchUserCountryQuery();
    const allowedCountries = ['GB', 'US', 'PL'];
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationForm>({
        resolver: zodResolver(RegistrationFormSchema)
    });

    const onSubmit = async ({ email, raidId }: RegistrationForm) =>
    {
        setIsSubmitting(true);

        const body = {
            username: raidId,
            email: email,
            password: raidId,
        };

        try
        {
            const userCountry = await checkUserCountry({});

            if (userCountry)
            {
                console.log(userCountry && 'data' in userCountry);
                if (!allowedCountries.includes(userCountry.data.country_code))
                {
                    alert('Sorry, but your country is not available :(');
                    reset();
                    return;
                }
            }

            const response = await registerForm(body);

            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();
                console.log('Token:', userToken);
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
        <div className="subtract-box">
            <h2 className={styles.form__title}>Enter your ID, and make a video</h2>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    placeholder={'Enter Raid ID here'}
                    name={'raidId'}
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    placeholder={'Enter Email'}
                    name={'email'}
                    register={register}
                    errors={errors}
                />
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
                    className={`hexagon-button ${styles.form__button}`}
                    disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Join event'}
                </button>
                <div className={styles.form__res}>
                    {data && <p className={styles.form__success}>Account has been created!</p>}
                    {isError && <p className={styles.form__error}>{error?.data?.message}</p>}
                </div>
            </form>
        </div>
    );
}