"use client"
import * as deepar from 'deepar';
import { useEffect, useRef, useState } from 'react';
const deepARParams: deepar.DeepARParams = {
    licenseKey: `96d1c0dbcb1844e574c4bdef2efef6367e40b17e8b89f28f3c87ada68cc6409bb5163c53aa57bf76`,
    additionalOptions: {
        cameraConfig: {
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