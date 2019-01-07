
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

const randIntegerInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randFloatInRange = (min, max, numDec) => {
    const num = Math.random() * (max - min + 1) + min; 
    return num.toFixed(numDec);
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16);

    if (hex.length < 2) {
        hex = '0' + hex;
    }

    return hex;
}

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
            const riv = randFloatInRange(0, 3, 2);

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

export const generateDummyStockData = (numDummyData) => {
    return createDummyData(numDummyData);
}

export const generateColumns = () => {
    return Object.keys(columnsAccessorToName)
        .map(acc => {
            return { 
                Header: columnsAccessorToName[acc],
                accessor: acc
             };
        });
}

export const mapIndicatorValue = (value) => {
    const constrainedValue = Math.min(Math.max(parseFloat(value), 0), 3); // lock value between 0 and 3
    let r = 0;
    let g = 0;
    let b = 0;

    if (constrainedValue >= 0 && constrainedValue <= 1) {
        r = 255;
        g = Math.abs(scale(constrainedValue, 0, 3, 0, 204) - 204);
        b = g;
    }

    // map green values
    // convert rgb to hex

    return value > 66 ? '#85cc00'
        : value > 33 ? '#ffbf00'
        : '#ff2e00'
}