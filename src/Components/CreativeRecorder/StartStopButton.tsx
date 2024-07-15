'use client'

import { useState } from "react"
import styles from './styles.module.scss';
import { IconButton } from "@mui/material";
import {stopPlay} from "@/store/slice/audioSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
interface StartStopButtonProps {
    onChange: (isStarted: boolean) => void,
    disabled: boolean
}

const getStartButton = (onClick: () => void, disabled: boolean) => (
    <IconButton

        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles['button-start']}`}
    >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_16_407)">
                <rect width="50" height="50" rx="25" fill="#5D5D5D" fill-opacity="0.55"/>
                <path
                    d="M12.2414 30V19.8182H16.2584C17.0274 19.8182 17.6836 19.9557 18.2272 20.2308C18.7741 20.5026 19.19 20.8887 19.4751 21.3892C19.7634 21.8864 19.9076 22.4714 19.9076 23.1442C19.9076 23.8203 19.7617 24.402 19.4701 24.8892C19.1784 25.3731 18.7558 25.7443 18.2023 26.0028C17.6521 26.2614 16.9859 26.3906 16.2037 26.3906H13.5141V24.6605H15.8557C16.2667 24.6605 16.6081 24.6042 16.8799 24.4915C17.1517 24.3788 17.3538 24.2098 17.4864 23.9844C17.6223 23.759 17.6903 23.4789 17.6903 23.1442C17.6903 22.8061 17.6223 22.5211 17.4864 22.2891C17.3538 22.0571 17.15 21.8814 16.8749 21.7621C16.6031 21.6394 16.2601 21.5781 15.8458 21.5781H14.3941V30H12.2414ZM17.74 25.3665L20.2705 30H17.8941L15.4182 25.3665H17.74ZM21.4289 30V19.8182H28.2897V21.593H23.5816V24.0192H27.9367V25.794H23.5816V28.2251H28.3096V30H21.4289ZM38.9848 23.3828H36.8073C36.7675 23.1011 36.6863 22.8509 36.5637 22.6321C36.441 22.41 36.2836 22.2211 36.0914 22.0653C35.8991 21.9096 35.6771 21.7902 35.4252 21.7074C35.1766 21.6245 34.9065 21.5831 34.6148 21.5831C34.0878 21.5831 33.6288 21.714 33.2377 21.9759C32.8466 22.2344 32.5433 22.6122 32.3279 23.1094C32.1124 23.6032 32.0047 24.2031 32.0047 24.9091C32.0047 25.6349 32.1124 26.2448 32.3279 26.7386C32.5466 27.2325 32.8515 27.6054 33.2426 27.8572C33.6337 28.1091 34.0861 28.2351 34.5999 28.2351C34.8882 28.2351 35.155 28.197 35.4003 28.1207C35.6489 28.0445 35.8693 27.9335 36.0615 27.7876C36.2538 27.6385 36.4128 27.4579 36.5388 27.2457C36.6681 27.0336 36.7575 26.7917 36.8073 26.5199L38.9848 26.5298C38.9285 26.9972 38.7876 27.4479 38.5622 27.8821C38.3402 28.313 38.0402 28.6991 37.6624 29.0405C37.2878 29.3786 36.8404 29.647 36.32 29.8459C35.803 30.0414 35.218 30.1392 34.5651 30.1392C33.6569 30.1392 32.8449 29.9337 32.129 29.5227C31.4164 29.1117 30.853 28.5168 30.4387 27.7379C30.0277 26.959 29.8222 26.0161 29.8222 24.9091C29.8222 23.7988 30.031 22.8542 30.4486 22.0753C30.8662 21.2964 31.433 20.7031 32.1489 20.2955C32.8648 19.8845 33.6702 19.679 34.5651 19.679C35.155 19.679 35.7019 19.7618 36.2057 19.9276C36.7128 20.0933 37.1619 20.3352 37.553 20.6534C37.9441 20.9683 38.2623 21.3544 38.5075 21.8118C38.7561 22.2692 38.9152 22.7929 38.9848 23.3828Z"
                    fill="#F1F1F1"/>
            </g>
            <defs>
                <filter id="filter0_b_16_407" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_16_407"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_16_407" result="shape"/>
                </filter>
            </defs>
        </svg>

    </IconButton>
)

const getStopButton = (onClick: () => void, disabled: boolean) => (
    <IconButton
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles['button-stop']}`}
    >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_40_1908)">
                <rect width="50" height="50" rx="25" fill="#FF4141" fillOpacity="0.8"/>
                <path
                    d="M19.2857 19.2857V30.7143H30.7143V19.2857H19.2857ZM18.1429 17H31.8571C32.1602 17 32.4509 17.1204 32.6653 17.3347C32.8796 17.5491 33 17.8398 33 18.1429V31.8571C33 32.1602 32.8796 32.4509 32.6653 32.6653C32.4509 32.8796 32.1602 33 31.8571 33H18.1429C17.8398 33 17.5491 32.8796 17.3347 32.6653C17.1204 32.4509 17 32.1602 17 31.8571V18.1429C17 17.8398 17.1204 17.5491 17.3347 17.3347C17.5491 17.1204 17.8398 17 18.1429 17Z"
                    fill="#F1F1F1"/>
            </g>
            <defs>
                <filter id="filter0_b_40_1908" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_40_1908"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_40_1908" result="shape"/>
                </filter>
            </defs>
        </svg>

    </IconButton>
)

export default function StartStopButton(props: StartStopButtonProps) {
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    function handleBtnClick() {
        setIsStarted(state => state = !state);
        props.onChange(isStarted);
        dispatch(stopPlay());
    }

    const button = isStarted
        ? getStopButton(handleBtnClick, props.disabled)
        : getStartButton(handleBtnClick, props.disabled);

    return button;
}
