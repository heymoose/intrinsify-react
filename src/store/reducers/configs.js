import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../jsUtils/immutableUpdate';
import cuid from 'cuid';

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

export const saveIntrinsifyConfig = (state, action) => {
    const config = updateObject(action.config, {
        id: cuid()
    });

    const updatedSavedConfigs = state.savedConfigs.concat(config);

    return updateObject(state, {
        savedConfigs: updatedSavedConfigs
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_INTRINSIFY_CONFIG:
            return setCurrentIntrinsifyConfig(state, action);
        case actionTypes.SAVE_INTRINSIFY_CONFIG:
            return saveIntrinsifyConfig(state, action);
        default:
            return state;
    }
};

export default reducer;
