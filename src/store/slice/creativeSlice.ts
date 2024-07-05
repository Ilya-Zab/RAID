import { createSlice } from '@reduxjs/toolkit';

interface FramesState
{
    currentFrame: string | null;
    isLoading: boolean;
    creativeName: string | null;
}

const initialState: FramesState = {
    currentFrame: null,
    isLoading: false,
    creativeName: null,
}

const creativeFramesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        setCurrentFrame(state, action)
        {
            state.currentFrame = action.payload
        },
        setCreativeName(state, action)
        {
            state.creativeName = action.payload
        },
        setLoading(state, action)
        {
            state.isLoading = action.payload
        },
    }
})

export const { setCreativeName, setCurrentFrame } = creativeFramesSlice.actions;
export default creativeFramesSlice.reducer;