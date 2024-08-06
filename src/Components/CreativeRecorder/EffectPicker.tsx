"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image";
import * as React from "react";
import styles from "./styles.module.scss";

export interface EffectItem
{
    name: string,
    src: string,
    url: string,
    data?: ArrayBuffer
}

export interface EffectPickerOptions
{
    effects: EffectItem[],
    orientation: 'vertical' | 'horizontal',
    selectedEffect?: EffectItem,
    onEffectChange: (effect: EffectItem) => void,
    radioName?: string
}

export function EffectPicker(options: EffectPickerOptions)
{
    const [selectedEffect, setSelectedEffect] = useState<EffectItem>(options.selectedEffect ?? options.effects[0]);

    useEffect(() =>
    {
        if (options.effects) handleEffectChange(options.effects[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.effects])

    function handleEffectChange(effect: EffectItem)
    {
        setSelectedEffect(effect);
        options.onEffectChange(effect);
    }

    return (
        <div className={options.orientation === 'horizontal' ? styles.wrapper : styles.wrapper2}>
            {options.effects.map(e =>
                <label key={e.name} className={styles.label}>
                    <input
                        type="radio"
                        name={options.radioName ? options.radioName : "mask"}
                        radioGroup="effectSelector"
                        checked={e.name === selectedEffect.name}
                        onChange={() => handleEffectChange(e)}
                        className={styles.input}
                    />
                    <span className={styles.img}>
                        <Image
                            src={`/images/icon/${e.src}`}
                            alt={e.name}
                            width={40}
                            height={40}
                            unoptimized
                        />
                    </span>
                </label>
            )}
        </div>
    );
}
