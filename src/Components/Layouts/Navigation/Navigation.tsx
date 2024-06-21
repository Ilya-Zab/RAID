import Box from '@mui/material/Box';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { z } from 'zod';

const wpMenuPropsSchema = z.object({
    correctStyle: z.string(),
    data: z.array(z.object({
        title: z.string(),
        url: z.string(),
    }))
});

type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;

const Navigation: FC<wpMenuProps> = ({ correctStyle, data }) =>
{

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