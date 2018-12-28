
const randNumInRange = (max) => {
    return max * Math.random() << 0;
}

const createDummyData = (tickers) => {
    const stockTickerToName = {
        'mmm': '3M Co',
        'ge': 'General Electric Company',
        'ko': 'The Coca Cola Co',
        'hsy': 'Hershey Co',
        'mcd': 'McDonalds Corp',
        'pep': 'PepsiCo, Inc.',
        'dis': 'Walt Disney Co',
        'de': 'Deere & Company'
    };
    const tickerKeys = Object.keys(stockTickerToName);
    let randKey;
    
    return tickers.map(tick => {
        randKey = tickerKeys[randNumInRange(tickerKeys.length)];
        return {
            "name": stockTickerToName[randKey],
            "ticker": randKey.toUpperCase(),
            "price": randNumInRange(100),
            "flatEstimateGrowth": 5,
            "aaaCorpBondYield": 3.56,
            "eps": randNumInRange(10),
            "iv": Math.random().toFixed(2),
            "niv": Math.random().toFixed(2)
        }
    });
}

export const retrieveStockData = (tickers) => {
    return createDummyData(tickers);
}