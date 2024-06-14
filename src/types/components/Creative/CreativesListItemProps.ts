import { z } from "zod";
import { CreativeDataTypeSchema } from "./CreativeDataType";

export const CreativesListItemPropsSchema = z.object({
    creative: CreativeDataTypeSchema,
    hasLiked: z.boolean()
});

export type CreativesListItemProps = z.infer<typeof CreativesListItemPropsSchema>;