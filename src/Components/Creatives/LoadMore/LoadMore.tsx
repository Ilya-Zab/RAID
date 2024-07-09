import React, { FC } from "react";
import styles from "./styles.module.scss";

interface LoadMorePropsType {
    onClick: any
}

const LoadMore: FC<LoadMorePropsType> = ({ onClick }) => {
    return (
        <div className={styles['view-more']}>
            <div className={styles['view-more__line']}></div>
            <button className={styles['view-more__button']} onClick={onClick} >
                <span className={styles['view-more__button-text']}>View More</span>
            </button>
            <div className={styles['view-more__line']}></div>
        </div>
    )
}

export default LoadMore;