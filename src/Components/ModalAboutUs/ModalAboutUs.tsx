// Show how your life was divided into Before and After playing Raid!

// Create a photo/video using our filter or upload a ready-made one. Grant access to the camera
// - Make sure you have the sound on your device turned on
// - Record a video using our filter or take a photo

// Good luck, champion!""

import { Box, IconButton, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import * as React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

const ModalAboutUs = () =>
{
    const dispatch = useDispatch();
    // @ts-ignore
    const open = useSelector((state) => state.modal.ModalAboutUs);
    const handleClose = () => dispatch(closeModal({ modalName: 'ModalAboutUs' }));
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Image
                    src={'/images/findId.png'}
                    alt={""}
                    width={768}
                    height={354}
                />
            </Box>
        </Modal>
    )
}

export default ModalAboutUs;