import React from 'react';
import TickerList from './TickerList/TickerList';
import style from './IntrinsifyConfig.module.css';

const intrinsifyConfig = props => (
    <div className={style.IntrinsifyConfig}>
        <span>
            <strong>Tickers: </strong>
        </span>
        <TickerList tickers={props.tickers} />
    </div>
);

export default intrinsifyConfig;
