import styles from "./styles.module.scss";
import {Box, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

const CreateVideoInfo = ({handleToggle}) => {
    return (
        <Box className={styles.modal}>
            <IconButton className={styles.modal__btn} onClick={handleToggle}>
                <CloseIcon/>
            </IconButton>
            <h3 className={styles.modal__title}>Video Instruction</h3>
            <Box className={styles.modal__scrollbar}>
                <ul className={styles.modal__list}>
                    <li className={styles.modal__item}>
                        - Grant access to the camera
                    </li>
                    <li className={styles.modal__item}>
                        - Make sure you have the sound on your device turned on
                    </li>
                    <li className={styles.modal__item}>
                        - Record a video using our filter or take a photo
                    </li>
                </ul>
                <p className={styles.modal__text}>
                    Good luck, champion!
                </p>
            </Box>
        </Box>
    )
}
export default CreateVideoInfo;