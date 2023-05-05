import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IButtonsSetting {
    buttons: Buttons;
}

export interface Buttons {
    style: IButtonsInfo[];
    version: IButtonsInfo[];
    c3: IButtonsInfo[];
    c4: IButtonsInfo[];
    c5: IButtonsInfo[];
    c6: IButtonsInfo[];
    c7: IButtonsInfo[];
}

export interface IButtonsInfo {
    code: string;
    name: string;
    selected?: boolean;
}

const initialState = {
    variant: {
        name: 'MJ version 5',
        code: '--v 5',
    } as IButtonsInfo,
    style: {
        name: '',
        code: '',
    } as IButtonsInfo,
    c3: {
        name: '',
        code: '',
    } as IButtonsInfo,
    c4: {
        name: '',
        code: '',
    } as IButtonsInfo,
    c5: {
        name: '',
        code: '',
    } as IButtonsInfo,
    c6: {
        name: '',
        code: '',
    } as IButtonsInfo,
    c7: [] as IButtonsInfo[],
    checkedSettings: true,
};

export const buttonsSetting = createSlice({
    name: 'buttonsSetting',
    initialState,
    reducers: {
        changeVariant: (state, action: PayloadAction<IButtonsInfo>) => {
            state.variant = action.payload;
        },
        changeStyle: (state, action: PayloadAction<IButtonsInfo>) => {
            state.style = action.payload;
        },
        changeC3: (state, action: PayloadAction<IButtonsInfo>) => {
            state.c3 = action.payload;
        },
        changeC4: (state, action: PayloadAction<IButtonsInfo>) => {
            state.c4 = action.payload;
        },
        changeC5: (state, action: PayloadAction<IButtonsInfo>) => {
            state.c5 = action.payload;
        },
        changeC6: (state, action: PayloadAction<IButtonsInfo>) => {
            state.c6 = action.payload;
        },
        changeC7: (state, action: PayloadAction<IButtonsInfo>) => {
            const itemIndex = state.c7.findIndex(item => item.name === action.payload.name);
            if (itemIndex === -1) {
                // Add the item to the array if it doesn't already exist
                state.c7.push(action.payload);
            } else {
                // Remove the item from the array if it already exists
                state.c7.splice(itemIndex, 1);
            }
        },
        setCheckedSetting: (state, action: PayloadAction<boolean>) => {
            state.checkedSettings = action.payload;
        },
    },
})

export const buttonsSettingReduser = buttonsSetting.reducer;
export const buttonsSettingActions = buttonsSetting.actions;