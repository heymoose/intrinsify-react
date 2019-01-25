import React from 'react';

const tickerList = props => <p>{props.tickers ? props.tickers.join(', ') : null}</p>;

export default tickerList;
