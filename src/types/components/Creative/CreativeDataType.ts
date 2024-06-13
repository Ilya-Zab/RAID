import { z } from "zod";
import { CreativeMetaDataTypeSchema } from "./CreativeMetaDataType";

export const CreativeDataTypeSchema = z.object({
    author: z.number(),
    author_name: z.string(),
    date: z.string(),
    date_gmt: z.string(),
    featured_media: z.number(),
    guid: z.object({
        rendered: z.string()
    }),
    id: z.number(),
    link: z.string(),
    meta: CreativeMetaDataTypeSchema,
    modified: z.string(),
    modified_gmt: z.string(),
    slug: z.string(),
    status: z.string(),
    template: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    type: z.string(),
    _links: z.any()
})

export type CreativeDataType = z.infer<typeof CreativeDataTypeSchema>;