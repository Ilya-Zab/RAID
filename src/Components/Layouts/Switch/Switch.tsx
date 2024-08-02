import { FC } from "react"
import styles from "./styles.module.scss";

export const Switch: FC = () =>
{
    return (
        <>
            <label className={styles.switch}>
                <input type="checkbox" />
                <span className={`${styles.round} ${styles.slider}`}></span>
            </label>
        </>
    )
} 