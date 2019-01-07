import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import TickerTextInput from '../../components/Controls/TickerTextInput/TickerTextInput';
import MaterialButton from '../../components/UI/MaterialButton/MaterialButton'
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';

class IntrinsifyContainer extends Component {
    state = {
        tickers: ''
    }

    onTickerTextInputChange = (event) => {
        const updatedTickers = event.target.value;
        this.setState({ tickers: updatedTickers });
    }

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
                <MaterialButton
                    variant='contained'
                    color='primary'
                    text='Calculate' />
                <IntrinsifyTable
                    dummyData />
            </>
        );
    }
}

export default IntrinsifyContainer;