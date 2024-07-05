"use client"

import * as deepar from 'deepar';
import { useEffect, useRef, useState } from 'react';

const deepARParams: deepar.DeepARParams = {
    licenseKey: "77ea85616186b0f1ba7a2c0091c992606914b88c23829977ecf5bb48b567c758211ae53973767de1",
    additionalOptions: {
        cameraConfig: {
            // https://docs.deepar.ai/deepar-sdk/platforms/web/getting-started#:~:text=cameraConfig%3A%20%7B-,disableDefaultCamera,-%3A%20true%0A%20%20%20%20%20%20%20%20%7D
            disableDefaultCamera: false
        }
    }
};

export default function useDeepAR(previewElementId: string, defaultEffectUrl: string = "effects/MASK_1.deepar"): deepar.DeepAR | null
{
    const [deepAR, setDeepAR] = useState<deepar.DeepAR | null>(null);
    const initState = useRef<boolean>(false);

    useEffect(() =>
    {
        if (!initState.current)
        {
            const previewElement = getDeepARScreen(previewElementId);
            initializeDeepAR(previewElement, defaultEffectUrl);
            initState.current = true;
        }
    }, []);

    return deepAR;

    async function initializeDeepAR(previewElement: HTMLElement, defaultEffectUrl: string): Promise<void>
    {
        const deepAR = await deepar.initialize({
            ...deepARParams,
            effect: defaultEffectUrl,
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