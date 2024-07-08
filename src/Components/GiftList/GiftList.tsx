import {Box, Typography, Modal, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "@/store/slice/modalsSlice";
import {packages, rare, total, pityPrizes} from "@/utils/constGifts";
import GiftItem from "@/Components/GiftList/GiftItem/GiftItem";
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';

const GiftList = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const open = useSelector((state) => state.modal.isOpenGifts);
    const handleClose = () => dispatch(closeModal({modalName: 'isOpenGifts'}));
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box className={styles.wrapper}>
                <Box className={styles.gifts}>
                    <IconButton className={styles.btn} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                    <Typography id="modal-modal-title" className={styles.gifts__title} variant="h2">
                        Check out prizes
                    </Typography>
                    <Box className={styles.list__wrapper}>
                        <Typography className={styles.list__title} variant="h3">
                            Rare, Epic & Legendary Champions
                        </Typography>
                        <Box className={styles.list}>
                            <Box className={styles.list__names}>
                                <Typography className={`text-gradient ${styles.list__names__name}`} variant='body2'>
                                    Name
                                </Typography>
                                <Typography className={`text-gradient ${styles.list__names__amount}`} variant='body2'>
                                    Amount
                                </Typography>
                            </Box>
                            {rare.map((data, index) => (
                                <GiftItem key={index} data={data}/>
                            ))}
                        </Box>
                    </Box>
                    <Box className={styles.list__wrapper}>
                        <Typography className={styles.list__title} variant="h3">
                            Packages
                        </Typography>
                        <Box className={styles.list}>
                            <Box className={styles.list__names}>
                                <Typography className={`text-gradient ${styles.list__names__name}`} variant='body2'>
                                    Name
                                </Typography>
                                <Typography className={`text-gradient ${styles.list__names__amount}`} variant='body2'>
                                    Amount
                                </Typography>
                            </Box>
                            {packages.map((data, index) => (
                                <GiftItem key={index} data={data}/>
                            ))}
                        </Box>
                    </Box>
                    <Box className={styles.list__wrapper}>
                        <Typography className={styles.list__title} variant="h3">
                            Total
                        </Typography>
                        <Box className={styles.list}>
                            <Box className={styles.list__names}>
                                <Typography className={`text-gradient ${styles.list__names__name}`} variant='body2'>
                                    Name
                                </Typography>
                                <Typography className={`text-gradient ${styles.list__names__amount}`} variant='body2'>
                                    Amount
                                </Typography>
                            </Box>
                            {total.map((data, index) => (
                                <GiftItem key={index} data={data}/>
                            ))}
                        </Box>
                    </Box>
                    <Box className={styles.list__wrapper}>
                        <Typography className={styles.list__title} variant="h3">
                            Pity Prizes
                        </Typography>
                        <Box className={styles.list}>
                            <Box className={styles.list__names}>
                                <Typography className={`text-gradient ${styles.list__names__name}`} variant='body2'>
                                    Name
                                </Typography>
                                <Typography className={`text-gradient ${styles.list__names__amount}`} variant='body2'>
                                    Amount
                                </Typography>
                            </Box>
                            {pityPrizes.map((data, index) => (
                                <GiftItem key={index} data={data}/>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
export default GiftList;
