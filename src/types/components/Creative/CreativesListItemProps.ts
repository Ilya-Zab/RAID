import { z } from "zod";
import { CreativeDataTypeSchema } from "./CreativeDataType";

export const CreativesListItemPropsSchema = z.object({
    creative: CreativeDataTypeSchema,
    hasVoted: z.boolean(),
    onVote: z.any()
});

export type CreativesListItemProps = z.infer<typeof CreativesListItemPropsSchema>;