import { createSlice } from '@reduxjs/toolkit';

interface modalSlice
{
    isOpenGifts: boolean;
    isOpenFindId: boolean;
    isOpenPrivacyNotice: boolean;
    isOpenRules: boolean;
    isModalUs: boolean;
}
const initialState: modalSlice = {
    isOpenGifts: false,
    isOpenFindId: false,
    isOpenPrivacyNotice: false,
    isOpenRules: false,
    isModalUs: false,
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) =>
        {
            const { modalName } = action.payload;
            state[modalName] = true;
        },
        closeModal: (state, action) =>
        {
            const { modalName } = action.payload;
            state[modalName] = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;