import { createSlice } from "@reduxjs/toolkit";

const saveUserStateToLocalStorage = (state) => {
    if (typeof window !== 'undefined') {
        const userStateJSON = JSON.stringify(state);
        localStorage.setItem('userState', userStateJSON);
    }
}

export const saveUserStateToLocalStorageMiddleware = store => next => action => {
    const result = next(action);
    const userState = store.getState().user;
    saveUserStateToLocalStorage(userState);
    return result;
};

const getUserStateFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const userStateJSON = localStorage.getItem('userState');

        if (!userStateJSON) return undefined;

        const userState = JSON.parse(userStateJSON);
        return userState;
    }

    return undefined;
}

type UserStateType = {
    votesAvailable: number,
    votesCreatives: string[]
}

const initialState: UserStateType = {
    votesAvailable: 1000,
    votesCreatives: []
};

const userSlice = createSlice({
    name: "user",
    initialState: getUserStateFromLocalStorage() || initialState,
    reducers: {
        increaseVotesAvailable(state) {
            state.votesAvailable++;
        },
        decreaseVotesAvailable(state) {
            state.votesAvailable--;
        },
        updateVotesAvailable(state, action) {
            state.votesAvailable = action.payload;
        },
        updateVotesCreatives(state, action) {
            state.votesCreatives = action.payload;
        },
        voteCreative(state, action) {
            state.votesAvailable--;
            state.votesCreatives.push(action.payload);
        },
        unvoteCreative(state, action) {
            state.votesAvailable++;
            state.votesCreatives = state.votesCreatives.filter(creativeId => creativeId != action.payload);
        }
    },
});

export const {
    updateVotesAvailable,
    updateVotesCreatives,
    increaseVotesAvailable,
    decreaseVotesAvailable,
    voteCreative,
    unvoteCreative
} = userSlice.actions;

export default userSlice.reducer;