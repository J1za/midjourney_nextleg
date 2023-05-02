import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface INewRequest {
    prompt: string,
    messageId: string,
}

const initialState = {
    isLoadingPrompt: false,
    isLoadingButtonPrompt: false,
    newRequest: [] as INewRequest[]
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

        setNewRequest: (state, action: PayloadAction<INewRequest>) => {
            const exists = state.newRequest.some(item => item.messageId === action.payload.messageId);
            if (!exists) {
                state.newRequest.push(action.payload);
            }
        },
    },
})

export const thlReduser = thlSlice.reducer;
export const thlActions = thlSlice.actions;