import { z } from "zod";

export const wpResponseErrorSchema = z.object({
    data: z.object({
        message: z.string(),
        status: z.string()
    }),
    status: z.string()
});

export const WpWooCustomErrorSchema = z.object({
    data: z.object({
        code: z.string(),
        data: z.object({
            status: z.number()
        }),
        message: z.string(),
    }),
    status: z.number()
});

export type WpWooCustomError = z.infer<typeof WpWooCustomErrorSchema>;
export const wpResponseErrorType = z.union([wpResponseErrorSchema, z.boolean()]);
export type wpResponseError = z.infer<typeof wpResponseErrorType>;