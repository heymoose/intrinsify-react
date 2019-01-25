import React from 'react';

const tickerList = props => <span>{props.tickers ? props.tickers.join(', ') : null}</span>;

export default tickerList;
