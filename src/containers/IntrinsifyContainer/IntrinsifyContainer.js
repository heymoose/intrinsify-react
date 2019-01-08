import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import TickerTextInput from '../../components/Controls/TickerTextInput/TickerTextInput';
import Submit from '../../components/Controls/Submit/Submit';
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';

// Data provided for free by IEX
// See terms of use here: https://iextrading.com/api-exhibit-a/

class IntrinsifyContainer extends Component {
    state = {
        tickers: '',
        stockData: []
    }

    onTickerTextInputChange = (event) => {
        const updatedTickers = event.target.value
            .trim()
            .split(',')
            .filter(Boolean);

        this.setState({ tickers: updatedTickers });
    }

    submitHandler = () => {
        const baseEndpoint = 'https://api.iextrading.com/1.0/';
        const query = `/stock/market/batch?symbols=${this.state.tickers.join(",")}&types=quote,stats`;

        axios.get(baseEndpoint + query)
            .then(response => {
                const updatedStockData = Object.keys(response.data)
                    .map(tick => {
                        return {
                            ticker: tick,
                            price: response.data[tick].quote.latestPrice,
                            eps: response.data[tick].stats.latestEPS,
                            name: response.data[tick].stats.companyName
                        }
                    });

                this.setState({stockData: updatedStockData});
            })
            .catch(error => {
                // For the purpose of the experiment I'll just log the error instead of handling it a better way
                console.log(error);
            });
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
                    locked={false}
                    change={this.onTickerTextInputChange} />
                <Submit
                    btnVariant='contained'
                    btnColor='primary'
                    btnText='Calculate'
                    btnClick={this.submitHandler} />
                <IntrinsifyTable
                    stockData={this.state.stockData} />
            </>
        );
    }
}

export default IntrinsifyContainer;