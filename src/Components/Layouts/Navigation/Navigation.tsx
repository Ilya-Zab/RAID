import Box from '@mui/material/Box';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
<<<<<<< HEAD
// import {useFetchMenuItemsQuery} from '@/store/wordpress';
import { wpMenuProps } from '@/types';
import { z } from 'zod';
// import { MenuSkeleton } from "../MenuSkeleton";
const data = [
    {
        title: 'Prizes',
        url: 'link1111',
    }, {
        title: 'Rules',
        url: 'link1111',
    }, {
        title: 'Privacy Notice',
        url: 'link1111',
    }, {
        title: 'Find ID',
        url: 'link1111',
    }, {
        title: 'Email us',
        url: 'link1111',
    }
];

const Navigation: FC<wpMenuProps> = ({ menuId, className = "", skeleton }) =>
{
    // const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: `${menuId}` });
=======
import {wpMenuProps} from '@/types';
>>>>>>> 19de771ae8b7954bfdb4aad476f1c7bddf8a994d

const Navigation: FC<wpMenuProps> = ({correctStyle, data}) => {

    return (
        <Box className={`${styles.nav} ${correctStyle}`}>
            <nav>
                <ul className={`list-reset ${styles.nav__list}`}>
                    {data && data.map((link, index) => (
                        <li key={index}>
                            <Link className='desc nav-link link' href={link.url}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </Box>
    );
};

export default Navigation;