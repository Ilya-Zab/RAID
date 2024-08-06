import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { togglePlay } from '../../store/slice/audioSlice';
import styles from './styles.module.scss';
import { IconButton } from '@mui/material';
import Image from 'next/image';

const AudioPlayer: React.FC = () =>
{
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() =>
    {
        if (audioRef.current)
        {
            if (isPlaying)
            {
                audioRef.current.play();
            } else
            {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTogglePlay = () =>
    {
        dispatch(togglePlay());
    };

    return (
        <div>
            <audio className={styles.audio} ref={audioRef} src="/audio/audio_bg.mp3" loop />
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label='play sound'
                onClick={handleTogglePlay}
                className='iconBtn'
            >
                <Image
                    src={`/images/icon/${isPlaying ? 'sound_on.svg' : 'sound_off.svg'}`}
                    alt='Audio'
                    width={40}
                    height={40}
                    unoptimized
                />
            </IconButton>
        </div>
    );
};

export default AudioPlayer;