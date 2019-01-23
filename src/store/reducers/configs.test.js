import reducer, { initialState, setCurrentIntrinsifyConfig } from './configs';
import * as actionTypes from '../actions/actionTypes';
import cuid from 'cuid';

describe('configs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set the current intrinsify config', () => {
        const config = {
                type: actionTypes.SET_CURRENT_INTRINSIFY_CONFIG,
                config: { id: '', tickers: ['KO', 'DIS'] }
            },
            expectedOutput = {
                ...initialState,
                currentConfig: {
                    id: '',
                    tickers: ['KO', 'DIS']
                }
            };

        expect(reducer(initialState, config)).toEqual(expectedOutput);
    });

    it('should add config to the list of saved configs', () => {
        const config = {
                type: actionTypes.SAVE_INTRINSIFY_CONFIG,
                config: { tickers: ['KO', 'DIS'] }
            },
            output = reducer(initialState, config);

        expect(output.savedConfigs).toHaveLength(1);
    });
});
