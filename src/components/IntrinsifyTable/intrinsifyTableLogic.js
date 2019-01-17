import React from 'react';
import { findColorRatioBetweenTwoColors } from '../../jsUtils/colorUtils';
import { randIntegerInRange, randFloatInRange, scale } from '../../jsUtils/numberUtils';
import * as constants from './constants';

const flatGrowthEstimate = 5;
const aaaCorpBondYield = 3.56;

const createDummyData = (num) => {
    const tickerKeys = Object.keys(constants.DUMMY_STOCK_NAMES);
    let randKey;
    
    return new Array(num)
        .fill(null)
        .map(tick => {
            randKey = tickerKeys[randIntegerInRange(0, tickerKeys.length - 1)];
            const price = randFloatInRange(5, 1000, 2);
            const eps = randFloatInRange(1, 10, 2);
            const iv = (eps * (8.5 + (2 * flatGrowthEstimate)) * 4.4) / aaaCorpBondYield;
            const riv = randFloatInRange(0, 2, 2);

            return {
                'name': constants.DUMMY_STOCK_NAMES[randKey],
                'ticker': randKey.toUpperCase(),
                'price': price,
                'flatGrowthEstimate': flatGrowthEstimate,
                'aaaCorpBondYield': aaaCorpBondYield,
                'eps': eps,
                'iv': iv.toFixed(2),
                'riv': riv,
                'rivIndicator': riv
            }
        });
}

export const mapIndicatorValue = (value) => {
    const constrainedValue = Math.min(Math.max(parseFloat(value), 0), 3); // lock value between 0 and 3
    let percentBetweenMinAndMax = 0;
    let hex = constants.RIV_INDICATOR_DEFAULT_COLOR;

    if (constrainedValue >= 0 && constrainedValue <= 1) {
        percentBetweenMinAndMax = constrainedValue;
        hex = findColorRatioBetweenTwoColors(
            constants.RIV_INDICATOR_RED_LOWER_BOUND, 
            constants.RIV_INDICATOR_RED_UPPER_BOUND, 
            percentBetweenMinAndMax);
    }
    else if (constrainedValue > 1 && constrainedValue <= 3.0) {
        percentBetweenMinAndMax = (constrainedValue - 1.0) / 2.0;
        hex = findColorRatioBetweenTwoColors(
            constants.RIV_INDICATOR_GREEN_UPPER_BOUND, 
            constants.RIV_INDICATOR_GREEN_LOWER_BOUND, 
            percentBetweenMinAndMax);
    }

    return '#' + hex;
}

export const mapIndicatorWidth = (value) => {
    const constrainedValue = Math.min(Math.max(parseFloat(value), 0), 3); // lock value between 0 and 3
    let width = 25;

    if (constrainedValue >= 0 && constrainedValue <= 1) {
        width = scale(Math.abs(constrainedValue - 1), 0, 1, 15, 100);
    }
    else if (constrainedValue > 1 && constrainedValue <= 3.0) {
        width = scale(constrainedValue, 1, 3, 15, 100);
    }

    return width + '%';
}

export const generateDummyStockData = (numDummyData) => {
    return createDummyData(numDummyData);
}

export const generateColumns = () => {
    return Object.keys(constants.COLUMNS_ACCESSOR_TO_NAME_MAP)
        .map(acc => {
            if (acc === 'rivIndicator') {
                return {
                    Header: constants.COLUMNS_ACCESSOR_TO_NAME_MAP[acc],
                    accessor: acc,
                    Cell: row => (
                        <div
                            style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#dadada',
                            borderRadius: '2px'
                            }}>
                            <div
                                style={{
                                    width: mapIndicatorWidth(row.value),
                                    height: '100%',
                                    backgroundColor: mapIndicatorValue(row.value),
                                    borderRadius: '2px',
                                    transition: 'all .2s ease-out'
                                }}
                            />
                        </div>
                    )
                }
            }
            return { 
                Header: constants.COLUMNS_ACCESSOR_TO_NAME_MAP[acc],
                accessor: acc
            };
        });
}

export const generateTableData = (stockData) => {
    return stockData.map(stock => {
        const iv = (stock.eps * (8.5 + (2 * flatGrowthEstimate)) * 4.4) / aaaCorpBondYield;
        const riv = iv / stock.price;

        return {
            'name': stock.name,
            'ticker': stock.ticker,
            'price': '$' + stock.price,
            'flatGrowthEstimate': flatGrowthEstimate,
            'aaaCorpBondYield': aaaCorpBondYield,
            'eps': '$' + stock.eps,
            'iv': '$' + iv.toFixed(2),
            'riv': riv.toFixed(2),
            'rivIndicator': riv
        }
    });
}