'use client'

import { useState } from "react"

interface StartStopButtonProps {
    onChange: (isStarted: boolean) => void,
    disabled: boolean
}

const getStartButton = (onClick: () => void, disabled: boolean) => (
    <button 
    
        onClick={onClick}
        disabled={disabled}
    >
        Start recording
    </button>
)

const getStopButton = (onClick: () => void, disabled: boolean) => (
    <button
        onClick={onClick}
        disabled={disabled}
    >
        Stop recording
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
