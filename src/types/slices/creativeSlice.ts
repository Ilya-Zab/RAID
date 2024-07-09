import { z } from "zod";

export const frame = z.object({
    frameBlob: z.instanceof(Blob),
    frameUrl: z.string()
});

export const frames = z.array(frame);

export type frameType = z.infer<typeof frame>;
export type framesType = z.infer<typeof frames>;