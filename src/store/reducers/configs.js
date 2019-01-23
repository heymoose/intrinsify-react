import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../jsUtils/immutableUpdate';

export const initialState = {
    savedConfigs: [],
    currentConfig: {
        id: '',
        tickers: []
    }
};

export const setCurrentIntrinsifyConfig = (state, action) => {
    return updateObject(state, {
        currentConfig: action.config
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_INTRINSIFY_CONFIG:
            return setCurrentIntrinsifyConfig(state, action);
        default:
            return state;
    }
};

export default reducer;
