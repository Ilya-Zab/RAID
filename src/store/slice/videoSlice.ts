import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
    video: Blob | null;
}

const initialState: VideoState = {
    video: null,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideo: (state, action: PayloadAction<Blob>) => {
            state.video = action.payload;
        },
        clearVideo: (state) => {
            state.video = null;
        },
    },
});

export const { setVideo, clearVideo } = videoSlice.actions;

export default videoSlice.reducer;