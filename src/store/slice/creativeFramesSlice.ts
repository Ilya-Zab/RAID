import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FramesState
{
    frames: string[];
}

const initialState: FramesState = {
    frames: [],
}

const creativeFramesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        setFrames(state, action: PayloadAction<string[]>)
        {
            state.frames = action.payload
        }
    }
})

export const { setFrames } = creativeFramesSlice.actions;
export default creativeFramesSlice.reducer;