import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from '../ModalFindId/styles.module.scss';
import variables from '@/styles/variables.module.scss';

const ModalAbout = () =>
{
    const dispatch = useDispatch();
    // @ts-ignore
    const open = useSelector((state) => state.modal.isModalUs);
    const handleClose = () => dispatch(closeModal({ modalName: 'isModalUs' }));
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box
                className={'modal-wrapper'}
                borderRadius={'20px'}
                padding={'70px 50px'}
                width={'900px'}
                maxWidth={'90%'}
                sx={{ background: variables.bg1 }}
            >
                <IconButton className={styles.iconBtn} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography
                    marginBottom={'20px'}
                    variant="h4">
                    Show how your life was divided into Before and After playing Raid!
                </Typography>
                <Typography
                    marginBottom={'10px'}
                    variant="body1">
                    Create a photo/video using our filter or upload a ready-made one. Grant access to the camera
                </Typography>
                <ul className="list-reset">
                    <li style={{ marginBottom: '10px' }}>- Make sure you have the sound on your device turned on</li>
                    <li style={{ marginBottom: '10px' }}>- Record a video using our filter or take a photo</li>
                </ul>
                <Typography variant="body1">Good luck, champion!</Typography>
            </Box>
        </Modal>
    )
}

export default ModalAbout;