import "@/styles/style.scss";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import Layout from "@/Components/Layout/Layout";
import {setupStore} from "@/store/store";

const store = setupStore();

export function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default App;