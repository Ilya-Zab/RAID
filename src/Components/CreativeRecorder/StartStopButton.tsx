'use client'

import { useState } from "react"
import styles from './styles.module.scss';

interface StartStopButtonProps {
    onChange: (isStarted: boolean) => void,
    disabled: boolean
}

const getStartButton = (onClick: () => void, disabled: boolean) => (
    <button 
    
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles['button-start']}`}
    >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_3003_55)">
                <rect width="50" height="50" rx="25" fill="#5D5D5D" fillOpacity="0.55"/>
            </g>
            <path d="M35.2805 23.2362L20.5988 14.0545C20.2909 13.8626 19.9387 13.7577 19.5782 13.7504C19.2176 13.7431 18.8617 13.8338 18.5466 14.0131C18.2315 14.1925 17.9687 14.454 17.7848 14.7712C17.6009 15.0883 17.5026 15.4497 17.5 15.8184V34.1816C17.5026 34.5503 17.6009 34.9117 17.7848 35.2288C17.9687 35.546 18.2315 35.8075 18.5466 35.9869C18.8617 36.1662 19.2176 36.2569 19.5782 36.2496C19.9387 36.2423 20.2909 36.1374 20.5988 35.9455L35.2805 26.7638C35.5765 26.5796 35.8212 26.3205 35.991 26.0116C36.1608 25.7027 36.25 25.3543 36.25 25C36.25 24.6457 36.1608 24.2973 35.991 23.9884C35.8212 23.6795 35.5765 23.4204 35.2805 23.2362ZM19.9456 33.4232V16.5768L33.4127 25L19.9456 33.4232Z" fill="white"/>
            <defs>
                <filter id="filter0_b_3003_55" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3003_55"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3003_55" result="shape"/>
                </filter>
            </defs>
        </svg>
    </button>
)

const getStopButton = (onClick: () => void, disabled: boolean) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles['button-stop']}`}
    >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_40_1908)">
                <rect width="50" height="50" rx="25" fill="#FF4141" fillOpacity="0.8"/>
                <path d="M19.2857 19.2857V30.7143H30.7143V19.2857H19.2857ZM18.1429 17H31.8571C32.1602 17 32.4509 17.1204 32.6653 17.3347C32.8796 17.5491 33 17.8398 33 18.1429V31.8571C33 32.1602 32.8796 32.4509 32.6653 32.6653C32.4509 32.8796 32.1602 33 31.8571 33H18.1429C17.8398 33 17.5491 32.8796 17.3347 32.6653C17.1204 32.4509 17 32.1602 17 31.8571V18.1429C17 17.8398 17.1204 17.5491 17.3347 17.3347C17.5491 17.1204 17.8398 17 18.1429 17Z" fill="#F1F1F1"/>
            </g>
            <defs>
                <filter id="filter0_b_40_1908" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_40_1908"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_40_1908" result="shape"/>
                </filter>
            </defs>
        </svg>

    </button>
)

export default function StartStopButton(props: StartStopButtonProps) {
    const [isStarted, setIsStarted] = useState<boolean>(false);

    function handleBtnClick() {
        setIsStarted(state => state = !state);
        props.onChange(isStarted);
    }

    const button = isStarted
        ? getStopButton(handleBtnClick, props.disabled)
        : getStartButton(handleBtnClick, props.disabled);

    return button;
}
