import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { thlActions } from "@/store/slices/thl.slice";

const allActions = {
    ...thlActions,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}