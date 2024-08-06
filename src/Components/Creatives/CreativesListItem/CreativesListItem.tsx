import { CreativesListItemProps } from "@/types/components/Creative";
import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { trimString } from "@/utils/trimString";
import VoteButton from "../VoteButton";
import { useRouter } from "next/router";
import Sharing from "../Sharing";
import { useMediaQuery } from "@mui/material";

const CreativesListItem: FC<CreativesListItemProps> = ({
    creative: { id, meta, title, preview_url },
    hasVoted,
    onVote,
    shared = false
}) =>
{
    const [sharingWindow, setSharingWindow] = useState(false);
    const isMobile = useMediaQuery(`(max-width: 800px)`);

    const router = useRouter();

    const openCreative = (id: number) =>
    {
        router.push({
            query: {
                creative: id
            }
        },
            null,
            { shallow: true }
        );
    }

    if (meta.featured_media_url === false) return;

    return (
        <div className={styles["creatives-list-item"]}>
            <button
                aria-label={title.rendered}
                className={styles["creatives-list-item__link"]}
                onClick={() => openCreative(id)}
            >
                <div className={styles["creatives-list-item__media"]}>
                    {(meta.featured_media_type === 'video' && preview_url) ?
                        <Image
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            src={`${preview_url}`} alt={title.rendered}
                            unoptimized
                        />
                        :
                        <Image
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            src={`${meta.featured_media_url && meta.featured_media_url}`} alt={title.rendered}
                            unoptimized
                        />
                    }
                </div>
                <div className={styles["creatives-list-item__content"]}>
                    <div className={styles["creatives-list-item__top"]}>
                        <div className={styles["creatives-list-item__share-button-wrapper"]}>

                        </div>
                    </div>
                    <div className={styles["creatives-list-item__bottom"]}>
                        <div className={styles["creatives-list-item__title"]}>
                            <div className={styles["creatives-list-item__title-bg"]}></div>
                            <div className={styles["creatives-list-item__title-label"]}>
                                {trimString(title.rendered, 16)}
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            {(shared && !isMobile) &&
                <button onClick={() => setSharingWindow(true)} className={styles["creatives-list-item__share-button"]} aria-label="Share">
                    <Image src={`/images/sharing-button.svg`} width={34} height={34} alt="Sharing" unoptimized />
                </button>
            }
            <div className={styles["creatives-list-item__votes"]}>
                <VoteButton votes={+meta.votes} onVote={() => onVote(id)} hasVoted={hasVoted} />
            </div>
            {sharingWindow &&
                <div className={styles["creatives-list-item__share-window"]}>
                    <button aria-label="Close" onClick={() => setSharingWindow(false)} className={styles["creatives-list-item__share-window-close"]}>
                        <Image src={'/images/close-mini.svg'} width={16} height={16} alt="times" unoptimized />
                    </button>
                    <Sharing
                        title={
                            <>Share on social networks</>
                        }
                        text={
                            <>and ask friends to <span className="text-gradient text-gradient_alt fw-600 ">like <br /> this post!</span> More likes - <br />more <span className="text-gradient text-gradient_alt fw-600 ">chances to win!</span></>
                        }
                        creativeId={id}
                    />
                </div>
            }
        </div>
    )
}

export default CreativesListItem;