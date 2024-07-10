"use client"
// 0985b5275cf03e7866a432d7817c39af9f7306fd5deda931d18335c169b9d98f31af4ef68511c390
// 00c8c511f53336d982642b6d914f9e0e6ca22f9754a0d90778403d608d79c035219ce95776c0eafa
import * as deepar from 'deepar';
import { useEffect, useRef, useState } from 'react';
const deepARParams: deepar.DeepARParams = {
    licenseKey: "00c8c511f53336d982642b6d914f9e0e6ca22f9754a0d90778403d608d79c035219ce95776c0eafa",
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