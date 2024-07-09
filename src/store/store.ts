import { combineReducers, configureStore } from '@reduxjs/toolkit';
import audioReducer from './slice/audioSlice';
import raidIdSlice from './slice/raidIdSlice';
import { jwtApi } from './wordpress/jwtApi';
import { wpAPI } from './wordpress/wpRestApi';
import { wpUser } from './wordpress/wpUser';
import { wpCustomAPI } from './wordpress/wpRestCustomApi';
import { ipApi } from './ipapi/ipapi';
import creativeSlice from './slice/creativeSlice';
import modalsSlice from "@/store/slice/modalsSlice";
import videoReducer from "./slice/videoSlice";

const rootReducer = combineReducers({

    [jwtApi.reducerPath]: jwtApi.reducer,
    [wpAPI.reducerPath]: wpAPI.reducer,
    [wpUser.reducerPath]: wpUser.reducer,
    [wpCustomAPI.reducerPath]: wpCustomAPI.reducer,
    [ipApi.reducerPath]: ipApi.reducer,
    audio: audioReducer,
    raidId: raidIdSlice,
    creative: creativeSlice,
    modal: modalsSlice,
    video: videoReducer,
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
                .concat(jwtApi.middleware)
                .concat(wpAPI.middleware)
                .concat(wpUser.middleware)
                .concat(wpCustomAPI.middleware)
                .concat(ipApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];