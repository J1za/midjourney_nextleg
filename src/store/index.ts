import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { thlReduser } from './slices/thl.slice';
import { buttonsSettingReduser } from './slices/buttonsSetting.slice';
import { queueImageApi } from './api/queueImage.api';

export const store = configureStore({
    reducer: {
        [queueImageApi.reducerPath]: queueImageApi.reducer,
        thlInfo: thlReduser,
        buttonsSettingInfo: buttonsSettingReduser,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(queueImageApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);