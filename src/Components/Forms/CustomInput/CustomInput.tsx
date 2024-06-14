import { FC, useState } from "react";
import styles from './styles.module.scss';
import Image from 'next/image';
import { CustomInputProps } from "@/types/services/forms";
export const CustomInput: FC<CustomInputProps> = ({
    fieldName,
    name,
    register,
    errors,
    className,
    isCheckbox = false,
    placeholder,
    onChange,
    value
}) =>
{
    let type;
    let inputClass = styles.customInput__input;

    if (isCheckbox)
    {
        type = 'checkbox';
        inputClass = styles.customInput__checkbox;
    }

    const registerProps = register ? register(name) : {};
    const isError = errors && name ? name in errors : false;

    return (
        <div>
            <label className={`${styles.customInput} ${isCheckbox && styles.customInput_checkbox} ${className}`}>
                <span>
                    {fieldName}
                </span>
                <div className={styles.customInput__inputWrapper}>
                    <input
                        placeholder={placeholder && placeholder}
                        {...registerProps}
                        style={{ color: 'black' }}
                        type={type && type}
                        className={`${inputClass} ${isError && styles.customInput__input_error}`}
                        onChange={onChange && onChange}
                        value={value && value}
                    />
                </div>
            </label>
            {isError && name && <p className={styles.customInput__error}>{errors[name]?.message}</p>}
        </div>
    )
};