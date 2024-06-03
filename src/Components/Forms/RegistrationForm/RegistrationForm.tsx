import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';

const RegistrationFormSchema = z.object({
    raidId: z.string(),
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
    const [fetchUserToken, { data: userToken }] = useFetchUserTokenMutation();
    const [cookies, setCookie] = useCookies(['userToken']);
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
            const response = await registerForm(body);

            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();
                console.log('Token:', userToken);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setCookie('userToken', userToken.token, { path: '/', expires: tomorrow });
                reset();
            }
        } catch (error)
        {
            console.error('Error:', error);
        } finally
        {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form
                style={{
                    margin: '50px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '300px'
                }}
                onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Your Raid ID here"
                    {...register("raidId")}
                    style={{ color: 'black' }}
                />
                {errors.raidId && <p>{errors.raidId?.message}</p>}
                <input
                    placeholder="Your Email"
                    {...register("email")}
                    style={{ color: 'black' }}
                />
                {errors.email && <p>{errors.email?.message}</p>}
                <label>
                    <input
                        type="checkbox"
                        {...register("country")}
                    />
                    I confirm that I am a US citizen (outside New York and Florida)
                </label>
                {errors.country && <p>{errors.country?.message}</p>}
                <label>
                    <input
                        type="checkbox"
                        {...register("terms")}
                    />
                    I agree to this event&apos;s Official Rules and Privacy notice
                </label>
                {errors.terms && <p>{errors.terms?.message}</p>}
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                {data && <p>{data.message}</p>}
                {isError && <p>{error.data.message}</p>}
            </form>
        </div>
    );
}
