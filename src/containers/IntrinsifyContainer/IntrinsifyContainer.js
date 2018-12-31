import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import TickerTextInput from '../../components/Controls/TickerTextInput/TickerTextInput';
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';

class IntrinsifyContainer extends Component {
    render() {
        return (
            <>
                <Header />
                <TickerTextInput 
                    id={'tickerInput'} 
                    type={'text'}
                    label='Tickers'
                    value='Tickers'
                    focussed={true}
                    locked={false} />
                <p>The submit button</p>
                <IntrinsifyTable />
            </>
        );
    }
}

export default IntrinsifyContainer;