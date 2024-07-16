import * as React from 'react';
import styles from './styles.module.scss';
import { Typography } from "@mui/material";

const Title = ({ title, correctClass }) =>
{

    return (
        <div className={`container ${styles[correctClass]}`}>
            <Typography className={styles.title__title} variant={'h1'} dangerouslySetInnerHTML={{ __html: title }} />
        </div>
    )
}
export default Title;