"use client"

import { ChangeEvent, useState } from "react"

export interface EffectItem {
    name: string,
    url: string
}

export interface EfectPickerOptions {
    effects: EffectItem[],
    selectedEffect?: EffectItem,
    onEffectChange: (effect: EffectItem) => void
}

export function EffectPicker(options: EfectPickerOptions) {
    const [selectedEffect, setSelectedEffect] = useState<EffectItem>(options.selectedEffect ?? options.effects[0]);

    function handleEffectChange(effect: EffectItem) {
        setSelectedEffect(effect);
        options.onEffectChange(effect);
    }

    return (
        <div>
            {options.effects.map(e => 
                <div key={e.name}>
                    <label>
                        <input
                            type="radio"
                            radioGroup="effectSelector"
                            checked={e.name === selectedEffect.name}
                            onChange={() => handleEffectChange(e)}
                        />
                        {" "}
                        {e.name}
                    </label>

                </div>
            )}
        </div>
    );
}
