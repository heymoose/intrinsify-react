import React from 'react';
import { findColorRatioBetweenTwoColors } from '../../jsUtils/colorUtils';
import { randIntegerInRange, randFloatInRange, scale } from '../../jsUtils/numberUtils';

const flatGrowthEstimate = 5;
const aaaCorpBondYield = 3.56;

const dummyStockNames = {
    'mmm': '3M Co',
    'ge': 'General Electric Company',
    'ko': 'The Coca Cola Co',
    'hsy': 'Hershey Co',
    'mcd': 'McDonalds Corp',
    'pep': 'PepsiCo, Inc.',
    'dis': 'Walt Disney Co',
    'de': 'Deere & Company'
};

const columnsAccessorToName = {
    'name': 'Name',
    'ticker': 'Ticker',
    'price': 'Price',
    'flatGrowthEstimate': 'Flat Growth Estimate',
    'aaaCorpBondYield': 'AAA Corporate Bond Yield',
    'eps': 'EPS',
    'iv': 'IV',
    'riv': 'RIV',
    'rivIndicator': 'Attractiveness'
};

const createDummyData = (num) => {
    const tickerKeys = Object.keys(dummyStockNames);
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
                'name': dummyStockNames[randKey],
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

const mapIndicatorValue = (value) => {
    const greenLowerBound = 'ccffe5';
    const greenUpperBound = '00994c';
    const redLowerBound = 'ffcccc';
    const redUpperBound = '990000';
    const constrainedValue = Math.min(Math.max(parseFloat(value), 0), 3); // lock value between 0 and 3
    let percentBetweenMinAndMax = 0;
    let hex = 'd3d3d3';

    if (constrainedValue >= 0 && constrainedValue <= 1) {
        percentBetweenMinAndMax = constrainedValue;
        hex = findColorRatioBetweenTwoColors(redLowerBound, redUpperBound, percentBetweenMinAndMax);
    }
    else if (constrainedValue > 1 && constrainedValue <= 3.0) {
        percentBetweenMinAndMax = constrainedValue / 3.0;
        hex = findColorRatioBetweenTwoColors(greenUpperBound, greenLowerBound, percentBetweenMinAndMax);
    }

    return '#' + hex;
}

const mapIndicatorWidth = (value) => {
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
    return Object.keys(columnsAccessorToName)
        .map(acc => {
            if (acc === 'rivIndicator') {
                return {
                    Header: columnsAccessorToName[acc],
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
                Header: columnsAccessorToName[acc],
                accessor: acc
            };
        });
}