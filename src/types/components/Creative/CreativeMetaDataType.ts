import { z } from "zod";

export const CreativeMetaDataTypeSchema = z.object({
    featured_media: z.string(),
    featured_media_type: z.string(),
    featured_media_url: z.union([z.string(), z.boolean()]),
    status: z.string(),
    votes: z.string()
});

export type CreativeMetaDataType = z.infer<typeof CreativeMetaDataTypeSchema>;