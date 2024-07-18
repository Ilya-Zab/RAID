import {Box, IconButton, Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "@/store/slice/modalsSlice";
import styles from "./styles.module.scss";
import * as React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

const ModalFindId = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const open = useSelector((state) => state.modal.isOpenFindId);
    const handleClose = () => dispatch(closeModal({modalName: 'isOpenFindId'}));
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box className={styles.wrapper}>
                <IconButton className={styles.iconBtn} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Image
                    src={'/images/findId.png'}
                    alt={""}
                    width={768}
                    height={354}
                    className={styles.img}
                />
            </Box>
        </Modal>
    )
}

export default ModalFindId;