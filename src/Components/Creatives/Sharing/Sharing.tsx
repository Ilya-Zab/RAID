import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Sharing = ({ title, text, creativeId }) => {

    const shareX = (creativeId) => {

    }

    const shareFb = (creativeId) => {

    }

    const shareTt = (creativeId) => {

    }

    const shareLink = (creativeId) => {

    }

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
                <button className={styles['sharing__button']} onClick={() => shareX(creativeId)}>
                    <Image width={40} height={40} alt="x" src={'/images/sharing-x.svg'} />
                </button>
                <button className={styles['sharing__button']} onClick={() => shareFb(creativeId)}>
                    <Image width={40} height={40} alt="x" src={'/images/sharing-fb.svg'} />
                </button>
                <button className={styles['sharing__button']} onClick={() => shareTt(creativeId)}>
                    <Image width={40} height={40} alt="x" src={'/images/sharing-tt.svg'} />
                </button>
                <button className={styles['sharing__button']} onClick={() => shareLink(creativeId)}>
                    <Image width={40} height={40} alt="x" src={'/images/sharing-share.svg'} />
                </button>
            </div>
        </div>
    );
}

export default Sharing;