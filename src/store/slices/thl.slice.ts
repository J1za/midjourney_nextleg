import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isLoadingPrompt: false,
    isLoadingButtonPrompt: false,
};

export const thlSlice = createSlice({
    name: 'thl',
    initialState,
    reducers: {
        setLoadingPrompt: (state, action: PayloadAction<boolean>) => {
            state.isLoadingPrompt = action.payload;
        },
        setLoadingButtonPrompt: (state, action: PayloadAction<boolean>) => {
            state.isLoadingButtonPrompt = action.payload;
        },
    },
})

export const thlReduser = thlSlice.reducer;
export const thlActions = thlSlice.actions;