import { CreativesListItemProps } from "@/types/components/Creative";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { trimString } from "@/utils/trimString";
import VoteButton from "../VoteButton";

const CreativesListItem: FC<CreativesListItemProps> = ({
    creative: { id, meta, title, author_name },
    hasVoted,
    onVote
}) => {

    if (meta.featured_media_url === false) return;

    return (
        <div className={styles["creatives-list-item"]}>
            <button aria-label={title.rendered} className={styles["creatives-list-item__link"]}>
                <div className={styles["creatives-list-item__media"]}>
                    {meta.featured_media_type === 'video' ?
                        <video
                            autoPlay={false}
                            loop
                            muted
                            width="100%"
                            height="100%"
                            className={styles["creatives-list-item__media-video"]}
                        >
                            <source
                                src={`${meta.featured_media_url && meta.featured_media_url}`}
                                type="video/mp4"
                            />
                        </video>
                        :
                        <Image
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            src={`${meta.featured_media_url && meta.featured_media_url}`} alt={title.rendered}
                        />
                    }
                </div>
                <div className={styles["creatives-list-item__content"]}>
                    <div className={styles["creatives-list-item__top"]}>
                        <div className={styles["creatives-list-item__share-button"]}>
                        </div>
                    </div>
                    <div className={styles["creatives-list-item__bottom"]}>
                        <div className={styles["creatives-list-item__title"]}>
                            <div className={styles["creatives-list-item__title-bg"]}></div>
                            <div className={styles["creatives-list-item__title-label"]}>
                                {trimString(title.rendered, 20)}
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            <div className={styles["creatives-list-item__votes"]}>
                <VoteButton votes={+meta.votes} onVote={() => onVote(id)} hasVoted={hasVoted} />
            </div>
        </div>
    )
}

export default CreativesListItem;