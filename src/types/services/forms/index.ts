import { z } from "zod";

export const CustomInputPropsSchema = z.object({
    fieldName: z.string().optional(),
    name: z.string().optional(),
    register: z.any().optional(),
    errors: z.any().optional(),
    className: z.string().optional(),
    isPassword: z.boolean().optional(),
    isCheckbox: z.boolean().optional(),
    isNumeric: z.boolean().optional(),
    placeholder: z.string().optional(),
    onChange: z.function().args(z.unknown() as z.ZodType<React.ChangeEvent<HTMLInputElement>>).returns(z.void()).optional(),
    value: z.string().optional(),
    onClick: z.function().args(z.void()).returns(z.void())
});

export type CustomInputProps = z.infer<typeof CustomInputPropsSchema>;