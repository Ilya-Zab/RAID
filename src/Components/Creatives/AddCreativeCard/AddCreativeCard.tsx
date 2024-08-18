import React, { FC } from "react";
import styles from "./styles.module.scss"
import backgroundImage from "/public/images/add-creative-card-bg.png";
import addIcon from "/public/images/icon/add_icon.svg";
import Image from "next/image";
import Link from "next/link";

interface AddCreativeCardPropsType
{
    hasLogin?: boolean;
}

const AddCreativeCard: FC<AddCreativeCardPropsType> = ({ hasLogin = false }) =>
{
    return (
        <button
            className={styles['add-creative-card']}
            onClick={() => alert('The acceptance of the entries has been completed and the contest results are being tallied. You can still cast your vote for the finalists.')}
        >
            <div
                className={styles['add-creative-card__content']}
                style={{
                    backgroundImage: `url(${backgroundImage.src})`,
                }}
            >
                <Image
                    className={styles['add-creative-card__icon']}
                    src={addIcon.src}
                    width={30}
                    height={30}
                    alt={"Add"}
                    unoptimized
                />
                {hasLogin ?
                    <span>Upload/Create<br />Your Content</span> :
                    <span>Join Event</span>
                }
            </div>
        </button>
    );
}

export default AddCreativeCard;