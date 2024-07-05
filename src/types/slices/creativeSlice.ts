import { z } from "zod";

const frame = z.object({
    frameBlob: z.instanceof(Blob),
    frameUrl: z.string()
});

const frames = z.array(frame);

export type framesType = z.infer<typeof frames>;