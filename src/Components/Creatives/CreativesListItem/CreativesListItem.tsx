import { CreativesListItemProps } from "@/types/components/Creative";
import React, { FC } from "react";
import styles from "./styles.module.scss";

const CreativesListItem: FC<CreativesListItemProps> = ({ creative: { meta, title, author_name } }, hasLiked) => {
    return (
        <div className={styles["creatives-list-item"]}>
            Status: {meta.status}<br />
            Url: {meta.featured_media_url}<br />
            Title: {title.rendered}<br />
            Author: {author_name}<br />
            Votes: {meta.votes}<br />
        </div>
    )
}

export default CreativesListItem;