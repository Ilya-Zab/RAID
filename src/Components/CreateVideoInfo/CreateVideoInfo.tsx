import styles from "./styles.module.scss";
import {Box, Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

const CreateVideoInfo = ({handleToggle,handleBack}) => {
    return (
        <Box className={styles.wrapper}>
            <Box className={styles.modal}>
                <IconButton className={styles.modal__btn} onClick={handleBack}>
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
            <Box className={`btnGradient2 ${styles.btn}`}>
                <Button
                    variant="contained"
                    className='btn-second'
                    onClick={handleToggle}
                >
                    Ok
                </Button>
            </Box>
        </Box>
    )
}
export default CreateVideoInfo;