import { z } from "zod";

export const wpResponseErrorSchema = z.object({
    data: z.object({
        message: z.string(),
        status: z.string()
    }),
    status: z.string()
});

export const wpResponseErrorType = z.union([wpResponseErrorSchema, z.boolean()]);

export type wpResponseError = z.infer<typeof wpResponseErrorType>;