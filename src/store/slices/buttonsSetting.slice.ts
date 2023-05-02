import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IButtonsSetting {
    buttons: Buttons;
}

export interface Buttons {
    style: IButtonsInfo[];
    version: IButtonsInfo[];
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
    checkedSettings: true
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
        setCheckedSetting: (state, action: PayloadAction<boolean>) => {
            state.checkedSettings = action.payload;
        },
    },
})

export const buttonsSettingReduser = buttonsSetting.reducer;
export const buttonsSettingActions = buttonsSetting.actions;