import React from "react";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.scss";

const CreativesListItemSkeleton = () => {
    return (

        <Skeleton
            sx={{
                backgroundColor: 'rgba(255,255,255,.4)',
                borderRadius: '10px'
            }}
            className={styles['creatives-list-item']}
            width={"100%"}
            height={"100%"}
            variant="rectangular"
        >
        </Skeleton>
    )
}

export default CreativesListItemSkeleton;