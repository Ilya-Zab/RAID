"use client"

import * as deepar from 'deepar';
import { useEffect, useRef, useState } from 'react';

const deepARParams: deepar.DeepARParams = {
    licenseKey: "f5664aa53dc145c08fb44de3e006d96432c708aad256c851638d8ba35b68509d149e65b64e7e24a2",
    effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators',
    additionalOptions: {
        cameraConfig: {
            // https://docs.deepar.ai/deepar-sdk/platforms/web/getting-started#:~:text=cameraConfig%3A%20%7B-,disableDefaultCamera,-%3A%20true%0A%20%20%20%20%20%20%20%20%7D
            disableDefaultCamera: false
        }
    }
};

export default function useDeepAR(previewElementId: string): deepar.DeepAR | null
{
    const [deepAR, setDeepAR] = useState<deepar.DeepAR | null>(null);
    const initState = useRef<boolean>(false);

    useEffect(() =>
    {
        if (!initState.current)
        {
            const previewElement = getDeepARScreen(previewElementId);
            initializeDeepAR(previewElement);
            initState.current = true;
        }
    }, []);

    return deepAR;

    async function initializeDeepAR(previewElement: HTMLElement): Promise<void>
    {
        const deepAR = await deepar.initialize({
            ...deepARParams,
            previewElement
        });

        setDeepAR(deepAR);
    }

    function getDeepARScreen(elementId: string): HTMLElement
    {
        const deepARScreen: HTMLElement | null = document.querySelector<HTMLElement>(elementId) ?? null;

        if (!deepARScreen)
            throw new Error("DIV element with id 'deepar-screen' does not found.");

        return deepARScreen;
    }
}
