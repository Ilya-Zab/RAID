import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FramesState
{
    currentFrame: string | null;
    frames: string[];
    isLoading: boolean;
    creativeName: string | null;
}

const initialState: FramesState = {
    currentFrame: null,
    frames: [],
    isLoading: false,
    creativeName: null,
}

const creativeFramesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        setFrames(state, action: PayloadAction<string[]>)
        {
            state.frames = action.payload
        },
        setCurrentFrame(state, action: PayloadAction<string>)
        {
            state.currentFrame = action.payload
        },
        setCreativeName(state, action: PayloadAction<string>)
        {
            state.creativeName = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>)
        {
            state.isLoading = action.payload
        },
    }
})

export const { setFrames } = creativeFramesSlice.actions;
export default creativeFramesSlice.reducer;