import { createSlice } from '@reduxjs/toolkit';

interface AudioState {
    isPlaying: boolean;
}

const initialState: AudioState = {
    isPlaying: false,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        stopPlay(state) {
            state.isPlaying = false;
        },
    },
});

export const { togglePlay,stopPlay } = audioSlice.actions;
export default audioSlice.reducer;