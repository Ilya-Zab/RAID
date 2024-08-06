import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const Sharing = ({ title, text, creativeId }) =>
{
    const [domain, setDomain] = useState('');
    useEffect(() =>
    {
        setDomain(window.location.origin);
    }, []);


    const shareLink = (creativeId) =>
    {
        const link = `${domain}?creative=${creativeId}`;
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard.")
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

                <div className={styles['sharing__button']}>
                    <TwitterShareButton
                        url={`${domain}?creative=${creativeId}`}
                        title="I'm taking part in #WeFinallyPlayedIt event! Vote for me, every like matters!"
                        hashtags={['#WeFinallyPlayedIt']}
                        aria-label="share via twitter"
                    >
                        <Image width={40} height={40} alt="x" src={'/images/sharing-x.svg'} unoptimized />
                    </TwitterShareButton>
                </div>
                <div className={styles['sharing__button']}>
                    <FacebookShareButton
                        url={`${domain}?creative=${creativeId}`}
                        title="I'm taking part in #WeFinallyPlayedIt event! Vote for me, every like matters!"
                        hashtag="#WeFinallyPlayedIt"
                        aria-label="share via facebook"
                    >
                        <Image width={40} height={40} alt="x" src={'/images/sharing-fb.svg'} unoptimized />
                    </FacebookShareButton>
                </div>
                {/* <button className={styles['sharing__button']} onClick={() => shareTt(creativeId)}>

                    <Image width={40} height={40} alt="x" src={'/images/sharing-tt.svg'} />

                </button> */}

                <button className={styles['sharing__button']} onClick={() => shareLink(creativeId)}>
                    <Image width={40} height={40} alt="x" src={'/images/sharing-share.svg'} unoptimized />
                </button>
            </div>
        </div>
    );
}

export default Sharing;