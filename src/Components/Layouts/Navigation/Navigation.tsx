import Box from '@mui/material/Box';
import {FC, useState} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import {z} from 'zod';
import {useDispatch} from "react-redux";
import {openModal} from "@/store/slice/modalsSlice";

const wpMenuPropsSchema = z.object({
    correctStyle: z.string(),
    data: z.array(z.object({
        title: z.string(),
        url: z.string(),
    }))
});

type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;

const Navigation: FC<wpMenuProps> = ({correctStyle, data}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpenGist = () => dispatch(openModal({modalName: 'isOpenGifts'}));
    const handleOpenFindId = () => dispatch(openModal({modalName: 'isOpenFindId'}));
    const handleOpenPrivacyNotice = () => dispatch(openModal({modalName: 'isOpenPrivacyNotice'}));
    const handleOpenRules = () => dispatch(openModal({modalName: 'isOpenRules'}));

    const handlerClick = () => {
        setOpen(!open);
    }
    return (
        <Box className={`${styles.nav} ${correctStyle}`}>
            <nav>
                <ul className={`list-reset ${styles.nav__list}`}>
                    {data && data.map((link, index) => (
                        <li key={index}>
                            {link.title === 'Prizes' ? (
                                <button className={styles.btn} onClick={handleOpenGist}>
                                    {link.title}
                                </button>
                            ) : link.title === 'Find ID' ? (
                                <button className={styles.btn} onClick={handleOpenFindId}>
                                    {link.title}
                                </button>
                            ) : link.title === 'Privacy Notice' ? (
                                <button className={styles.btn} onClick={handleOpenPrivacyNotice}>
                                    {link.title}
                                </button>
                            ) : link.title === 'Rules' ? (
                                <button className={styles.btn} onClick={handleOpenRules}>
                                    {link.title}
                                </button>
                            ) : link.title === 'Materials' ? (
                                <Box className={styles.dropDown}>
                                    <button className={styles.btn} onClick={handlerClick}>
                                        {link.title}
                                    </button>
                                    {
                                        open &&
										<Box className={styles.dropDown__list}>
											<Link className={'desc nav-link link'}
                                                  href="https://www.instagram.com/ar/8650758814950981"
                                                  target={'_blank'}>Mask</Link>
                                            <a href="/audio/AR_CONTRAST_sad_piano_Break_v04.1.mp3" download className="desc nav-link link">Sound</a>
										</Box>
                                    }
                                </Box>
                            ) : (
                                <Link className='desc nav-link link' href={link.url || ''}>
                                    {link.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </Box>
    );
};

export default Navigation;