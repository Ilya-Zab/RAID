import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import Layout from "@/Components/Layout/Layout";
import { setupStore } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCheckUserId } from "@/utils/checkUserIp";
import { AccessDeniedPage } from "@/Components/Layouts/AccessDeniedPage";
import CreateVideoInfo from "@/Components/CreateVideoInfo/CreateVideoInfo";


const store = setupStore();

export function App({ Component, pageProps }: AppProps)
{
    const router = useRouter();
    const { checkUserId, accessDenied } = useCheckUserId();

    useEffect(() =>
    {
        checkUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname])

    if (accessDenied)
        return <AccessDeniedPage />

    return (
        <Provider store={store}>
            <CreateVideoInfo handleToggle={() => { }} handleBack={() => { }} />
            {/* <Layout>
                <Component {...pageProps} />
            </Layout> */}
        </Provider>
    )
}
export default App;