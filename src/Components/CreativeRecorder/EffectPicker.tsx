"use client"

import {ChangeEvent, useEffect, useState} from "react"
import Image from "next/image";
import * as React from "react";
import styles from "./styles.module.scss";

export interface EffectItem {
    name: string,
    src: string,
    url: string
}

export interface EffectPickerOptions {
    effects: EffectItem[],
    orientation: string,
    selectedEffect?: EffectItem,
    onEffectChange: (effect: EffectItem) => void
}

export function EffectPicker(options: EffectPickerOptions) {
    const [selectedEffect, setSelectedEffect] = useState<EffectItem>(options.selectedEffect ?? options.effects[0]);

    useEffect(() => {
        if (!options.selectedEffect) {
            options.onEffectChange(options.effects[0]);
        }
    }, []);

    function handleEffectChange(effect: EffectItem) {
        setSelectedEffect(effect);
        options.onEffectChange(effect);
    }

    return (
        <div className={options.orientation === 'horizontal' ? styles.wrapper : styles.wrapper2}>
            {options.effects.map(e =>
                <label key={e.name} className={styles.label}>
                    <input
                        type="radio"
                        name="mask"
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
                         />
                    </span>
                </label>
            )}
        </div>
    );
}
