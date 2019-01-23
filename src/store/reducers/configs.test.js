import reducer, { initialState, setCurrentIntrinsifyConfig } from './configs';
import * as actionTypes from '../actions/actionTypes';

describe('configs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set the current intrinsify config', () => {
        const config = {
            type: actionTypes.SET_CURRENT_INTRINSIFY_CONFIG,
            config: { id: '', tickers: ['KO', 'DIS'] }
        };
        const expectedOutput = {
            ...initialState,
            currentConfig: {
                id: '',
                tickers: ['KO', 'DIS']
            }
        };

        expect(reducer(initialState, config)).toEqual(expectedOutput);
    });
});
