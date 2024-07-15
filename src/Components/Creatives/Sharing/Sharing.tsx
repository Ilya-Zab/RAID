import React from "react";
import styles from "./styles.module.scss";

const Sharing = ({ title, text, creativeId }) => {
    return (
        <div className={styles['sharing']}>
            <div className={styles['sharing__titling']}>
                <div className={styles['sharing__title']}>
                    {title}
                </div>
                <div className={styles['sharing__text']}>
                    {text}
                </div>
            </div>
            <div className={styles['sharing__buttons']}>
                <button className={styles['sharing__buttons']}>
                    insta
                </button>
            </div>
        </div>
    );
}

export default Sharing;