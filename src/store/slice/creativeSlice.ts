import { createSlice } from '@reduxjs/toolkit';

interface FramesState
{
    isLoading: boolean;
    creativeName: string | null;
}

const initialState: FramesState = {
    isLoading: false,
    creativeName: null,
}

const creativeFramesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
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

export const { setCreativeName } = creativeFramesSlice.actions;
export default creativeFramesSlice.reducer;