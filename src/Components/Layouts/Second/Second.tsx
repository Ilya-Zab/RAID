import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';

const Second = () => {
    const beforeRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= 1) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            },
            {
                root: null,
                rootMargin: ' 0px',
                threshold: 1
            }
        );

        if (beforeRef.current) {
            observer.observe(beforeRef.current);
        }

        return () => {
            if (beforeRef.current) {
                observer.unobserve(beforeRef.current);
            }
        };
    }, []);

    return (
        <Box className={`${styles.second} ${isFixed ? styles.fixed : ''}`} ref={beforeRef}>
            <Box className={styles.container}>
                <Box className={styles.second__title_wrapper}>
                    <h2 className={styles.second__title}>
                        Many are <br />
                        already a part <br />
                        of the contest. <br />
                        Check how they <br />
                        played, get <br />
                        inspired and <br />
                        <span className='text-gradient'>JOIN US</span>
                    </h2>
                </Box>
            </Box>
        </Box>
    );
}

export default Second;