import * as actionTypes from './actionTypes';

export const saveIntrinsifyConfig = config => {
    return {
        type: actionTypes.SAVE_INTRINSIFY_CONFIG,
        config: config
    };
};

export const deleteIntrinsifyConfig = configId => {
    return {
        type: actionTypes.DELETE_INTRINSIFY_CONFIG,
        configId: configId
    };
};

export const setCurrentIntrinsifyConfig = config => {
    return {
        type: actionTypes.SET_CURRENT_INTRINSIFY_CONFIG,
        config: config
    };
};
