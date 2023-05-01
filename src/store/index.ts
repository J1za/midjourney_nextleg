import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { thlReduser } from './slices/thl.slice';
import { buttonsSettingReduser } from './slices/buttonsSetting.slice';

export const store = configureStore({
    reducer: {
        thlInfo: thlReduser,
        buttonsSettingInfo: buttonsSettingReduser,
    },
})

export type TypeRootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);