import { z } from "zod";

const wpResponseErrorSchema = z.object({
    data: z.object({
        message: z.string(),
        status: z.string()
    }),
    status: z.string()
});

type wpResponseError = z.infer<typeof wpResponseErrorSchema>;