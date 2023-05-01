import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { thlReduser } from './slices/thl.slice';

export const store = configureStore({
    reducer: {
        thlInfo: thlReduser
    },
})

export type TypeRootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);