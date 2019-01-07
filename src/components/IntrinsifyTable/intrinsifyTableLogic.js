
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

export const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export const rgbToHex = (r, g, b) => {
    return ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1);
}

// Source for color mapping code:
// https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position

const getComponentFromHexColorCode = (color, component) => {
    if (component === 'r') {
        return color.substring(0, 2);
    }
    else if (component === 'g') {
        return color.substring(2, 4);
    }
    else if (component === 'b') {
        return color.substring(4, 6);
    }
    
    return color;
}

const findColorComponentRatioBetweenTwoColors = (comp1, comp2, ratio) => {
    return Math.ceil(parseInt(comp1, 16) * ratio + parseInt(comp2, 16) * (1 - ratio));
}

const findColorRatioBetweenTwoColors = (color1, color2, ratio) => {
    const rComponentColor1 = getComponentFromHexColorCode(color1, 'r');
    const rComponentColor2 = getComponentFromHexColorCode(color2, 'r');
    const gComponentColor1 = getComponentFromHexColorCode(color1, 'g');
    const gComponentColor2 = getComponentFromHexColorCode(color2, 'g');
    const bComponentColor1 = getComponentFromHexColorCode(color1, 'b');
    const bComponentColor2 = getComponentFromHexColorCode(color2, 'b');
    const r = findColorComponentRatioBetweenTwoColors(rComponentColor1, rComponentColor2, ratio);
    const g = findColorComponentRatioBetweenTwoColors(gComponentColor1, gComponentColor2, ratio);
    const b = findColorComponentRatioBetweenTwoColors(bComponentColor1, bComponentColor2, ratio);
    return rgbToHex(r, g, b);
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