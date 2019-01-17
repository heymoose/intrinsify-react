import * as logic from './intrinsifyTableLogic';
import * as constants from './constants';

describe('IntrinsifyTableLogic', () => {
    it('should return the right number of dummyData objects', () => {
        expect(logic.generateDummyStockData(20)).toHaveLength(20);
    });

    it('should return a stock data row object for each stock object passed in', () => {
        expect(logic.generateTableData(new Array(10).fill({
            name: 'test',
            ticker: 'ko',
            eps: 1,
            price: 1,
        }))).toHaveLength(10);
    });

    it('should return a column object for each key in the columns accessor to name map', () => {
        const columnsLength = Object.keys(constants.COLUMNS_ACCESSOR_TO_NAME_MAP).length;
        expect(logic.generateColumns()).toHaveLength(columnsLength);
    });
});