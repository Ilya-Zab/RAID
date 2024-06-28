import React from "react";
import styles from "./styles.module.scss";

const LoadMore = () => {
    return (
        <div className={styles['view-more']}>
            <div className={styles['view-more__line']}></div>
            <button className={styles['view-more__button']} >
                <span className={styles['view-more__button-text']}>View More</span>
            </button>
            <div className={styles['view-more__line']}></div>
        </div>
    )
}

export default LoadMore;