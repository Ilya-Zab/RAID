import { combineReducers, configureStore } from '@reduxjs/toolkit';
import audioReducer from './slice/audioSlice';
import { jwtApi } from './wordpress/jwtApi';
import { wpAPI } from './wordpress/wpRestApi';

const rootReducer = combineReducers({

    [jwtApi.reducerPath]: jwtApi.reducer,
    [wpAPI.reducerPath]: wpAPI.reducer,
    audio: audioReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(jwtApi.middleware)
                .concat(wpAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];