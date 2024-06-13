import { z } from "zod"

const userSharedCreatives = z.array(z.object({
    creative_id: z.string(),
    socials: z.array(z.string())
}))

const userMetaSchema = z.object({
    is_approved: z.string(),
    userSharedCreatives,
    votes_available: z.string(),
    votes_creatives: z.array(z.string())
})

const userSchema = z.object({
    avatar_urls: z.any(),
    description: z.string(),
    id: z.number(),
    link: z.string(),
    meta: userMetaSchema,
    name: z.string(),
    slug: z.string(),
    url: z.string(),
    _links: z.any()
})