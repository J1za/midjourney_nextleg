import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { thlActions } from "@/store/slices/thl.slice";
import { buttonsSettingActions } from "@/store/slices/buttonsSetting.slice";

const allActions = {
    ...thlActions,
    ...buttonsSettingActions,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}