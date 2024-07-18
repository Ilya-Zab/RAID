import { FC } from "react";
import styles from './style.module.scss';

export const AccessDeniedPage: FC = () =>
{
    return (
        <section className={styles.accessDenied}>
            <h1>Sorry, but this app is not available in your country.</h1>
        </section>
    )
} 