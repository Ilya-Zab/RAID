import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyFetchUserQuery, useRegisterUserMutation } from "@/store/wordpress/wpRestApi";
import { useFetchUserTokenMutation } from "@/store/wordpress/jwtApi";
import { useCookies } from 'react-cookie';

const LoginFormSchema = z.object({
    raidId: z.string(),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

export const LoginForm: FC = () =>
{
    const [fetchUserToken, { data, isError, error }] = useFetchUserTokenMutation();
    const [getUserInfo, { data: user }] = useLazyFetchUserQuery();
    const [cookies, setCookie] = useCookies(['userToken']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema)
    });

    const onSubmit = async ({ raidId }: LoginForm) =>
    {
        setIsSubmitting(true);

        const body = {
            username: raidId,
        };

        try
        {
            const userToken = await fetchUserToken({ username: raidId, password: raidId }).unwrap();

            if (userToken)
            {
                const userInfo = await getUserInfo({ username: raidId, });
                console.log(userInfo.data[0]);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setCookie('userToken', userToken.token, { path: '/', expires: tomorrow });
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
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                {data && <p>{data.message}</p>}
                {/* {isError && <p>{error.data.message}</p>} */}
            </form>
        </div>
    );
}
