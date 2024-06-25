import { z } from "zod";

const VoteButtonPropsSchema = z.object({
    votes: z.number(),
    onVote: z.any(),
    hasVoted: z.boolean()
});

export type VoteButtonProps = z.infer<typeof VoteButtonPropsSchema>;