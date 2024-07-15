"use client"

import { EffectItem } from "@/Components/CreativeRecorder/EffectPicker"
import axios from "axios"
import { useEffect, useRef, useState } from "react"

export interface EffectsPreloaderParams {
    effects: EffectItem[]
}

export type EffectsPreloaderResult = {
    startPreloading: () => Promise<void>,
    isPreloaded: boolean,
    error: Error | null
}

export function useEffectsPreloader({ effects }: EffectsPreloaderParams) {
    const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    async function startPreloading() {
        try {
            const loads = effects.map(async (e) => {
                e.data = await getArrayBuffer(e.url);
            });

            await Promise.all(loads);
            setIsPreloaded(true);
        }
        catch (e) {
            setError(e as any as Error);
        }
    }

    return { startPreloading, isPreloaded, error };

    async function getArrayBuffer(url: string): Promise<ArrayBuffer> {
        return await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" })
            .then(response => response.data);
    }
}
