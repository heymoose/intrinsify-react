import React from 'react';
import TickerList from './TickerList/TickerList';

const intrinsifyConfig = props => (
    <div>
        <p>Tickers</p>
        <TickerList tickers={props.tickers} />
    </div>
);

export default intrinsifyConfig;
