import React, { FC } from "react"
import styles from "./styles.module.scss";
import { CreativeDataType } from "@/types/components/Creative";
import backgroundImage from "/public/images/creative-card-stroke.png";
import waitIcon from "/public/images/wait.svg";
import Image from "next/image";
import CreativesListItem from "../CreativesListItem";
import Link from "next/link";


interface MyCreativeCardPropsType {
    creative: CreativeDataType
}

const MyCreativeCard: FC<MyCreativeCardPropsType> = ({ creative }) => {
    return (
        (creative.status === 'publish') ?
            <CreativesListItem creative={creative} hasVoted={false} onVote={() => { }} /> :
            <div className={styles['my-creative-card']}>
                <div className={styles["my-creative-card__media"]}>
                    {(creative.meta.featured_media_type === 'video' && creative.preview_url) ?
                        <Image
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            src={`${creative.preview_url}`} alt={creative.title.rendered}
                        />
                        :
                        <Image
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            src={`${creative.meta.featured_media_url && creative.meta.featured_media_url}`} alt={creative.title.rendered}
                        />
                    }
                </div>
                <div
                    className={styles['my-creative-card__content']}
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`,
                    }}
                >
                    <div className={styles['my-creative-card__icon']}>
                        <Image src={waitIcon.src} width={42} height={42} alt="wait" />
                    </div>

                    <div className={styles['my-creative-card__title']}>
                        Your post is being moderated
                    </div>

                    <div className={styles['my-creative-card__text']}>
                        Once verified, you&apos;ll be able to share  it on the other socials to get more likes & a special badge for attracting more attention!
                    </div>

                    <Link
                        href={'/'}
                        className={`hexagon-button hexagon-button_gradient ${styles['my-creative-card__button']}`}
                    >
                        Play RAID Now
                    </Link>
                </div>

            </div>
    )
}

export default MyCreativeCard;