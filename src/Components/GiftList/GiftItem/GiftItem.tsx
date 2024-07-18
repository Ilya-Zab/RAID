import { Box, Typography } from "@mui/material";
import styles from './styles.module.scss';
import Image from "next/image";
import * as React from "react";

const GiftItem = ({ data }) =>
{
    const { img, name, text, quantity } = data;
    return (
        <Box className={styles.gift_wrapper}>
            <Image
                src={img}
                alt={name}
                width={90}
                height={80}
                className={styles.gift_img}
                style={{
                    objectFit: 'cover'
                }}
            />
            <Typography variant='h4' className={styles.gift_name}>
                <span>
                    {name}
                </span>
                {text && <span>{text}</span>}
            </Typography>
            <Typography variant="caption" className={styles.gift_quantity}>
                {quantity}
            </Typography>
        </Box>
    )
}

export default GiftItem;