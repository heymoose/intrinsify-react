
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
};

const randNumInRange = (max) => {
    return max * Math.random() << 0;
}

const createDummyData = (num) => {
    const tickerKeys = Object.keys(dummyStockNames);
    let randKey;
    
    return new Array(num)
        .fill(null)
        .map(tick => {
            randKey = tickerKeys[randNumInRange(tickerKeys.length)];

            return {
                "name": dummyStockNames[randKey],
                "ticker": randKey.toUpperCase(),
                "price": randNumInRange(100),
                "flatGrowthEstimate": 5,
                "aaaCorpBondYield": 3.56,
                "eps": randNumInRange(10),
                "iv": Math.random().toFixed(2),
                "riv": Math.random().toFixed(2)
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