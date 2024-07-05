import { Box, Popover, IconButton } from "@mui/material";

import styles from "./styles.module.scss";
import * as React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const CustomPopover = styled(Popover)`
    .MuiPopover-paper {
      backdrop-filter: blur(55px);
      box-shadow: 0 14px 54px 0 rgba(0, 0, 0, 0.25);
      top: 300px!important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: rgba(66, 113, 161, 0.8);
      padding: 26px 12px;
      border-radius: 8px;
      max-width: 286px;
      width: 100%;
      min-height: 226px;
    }
`;

const Modal = ({ children, open, handleToggle }) =>
{
    const id = open ? "pp" : "";

    return (
        <CustomPopover
            id={id}
            open={open}
            onClose={handleToggle}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }
            }
        >
            <IconButton className={styles.iconBtn} onClick={handleToggle}>
                <CloseIcon />
            </IconButton>
            {children}
        </CustomPopover>
    )
}

export default Modal;