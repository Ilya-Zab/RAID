import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

const raidIdSliceSchema = z.object({
    raidId: z.string().nullable()
});

type raidIdSlice = z.infer<typeof raidIdSliceSchema>;

const initialState: raidIdSlice = {
    raidId: null
}

const raidIdSlice = createSlice({
    name: 'raidId',
    initialState,
    reducers: {
        setRaidId(state, action: PayloadAction<string | null>)
        {
            state.raidId = action.payload;
        },
    },
});

export const { setRaidId } = raidIdSlice.actions;
export default raidIdSlice.reducer;