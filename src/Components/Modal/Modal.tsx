import { Box, Popover, IconButton } from "@mui/material";

import styles from "./styles.module.scss";
import * as React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const CustomPopover = styled(Popover)`
    .MuiPopover-paper {
      backdrop-filter: blur(55px);
      box-shadow: 0 14px 54px 0 rgba(0, 0, 0, 0.25);
      top: 40% !important;
      left: 50% !important;
      transform: translateX(-50%)!important;
      background: rgba(66, 113, 161, 0.8);
      padding: 39px 21px 47px;
      border-radius: 8px;
    }
`;

const Modal = ({ children, open, handleToggle }) =>
{
    return (
        <CustomPopover
            open={open}
            onClose={handleToggle}
        >
            <IconButton className={styles.iconBtn} onClick={handleToggle}>
                <CloseIcon />
            </IconButton>
            {children}
        </CustomPopover>
    )
}

export default Modal;