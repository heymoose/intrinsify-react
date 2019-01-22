import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TickerTextInput from '../../components/Controls/TickerTextInput/TickerTextInput';
import Submit from '../../components/Controls/Submit/Submit';
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';
import * as actions from '../../store/actions/index';

// Data provided for free by IEX
// See terms of use here: https://iextrading.com/api-exhibit-a/

class IntrinsifyContainer extends Component {
    state = {
        stockData: []
    };

    onTickerTextInputChange = event => {
        const updatedTickers = event.target.value
            .trim()
            .split(',')
            .filter(Boolean);

        this.props.onSetCurrentConfig({
            ...this.props.currentConfig,
            tickers: updatedTickers
        });
    };

    submitHandler = () => {
        const tickers = this.props.currentConfig.tickers.join(',');
        const query = `/stock/market/batch?symbols=${tickers}&types=quote,stats`;

        axios
            .get(query)
            .then(response => {
                const updatedStockData = Object.keys(response.data).map(
                    tick => {
                        return {
                            ticker: tick,
                            price: response.data[tick].quote.latestPrice,
                            eps: response.data[tick].stats.latestEPS,
                            name: response.data[tick].stats.companyName
                        };
                    }
                );

                this.setState({ stockData: updatedStockData });
            })
            .catch(error => {
                // For the purpose of the experiment I'll just log the error instead of handling it a better way
                console.log(error);
            });
    };

    render() {
        return (
            <>
                <TickerTextInput
                    type={'text'}
                    label='Tickers'
                    value='Tickers'
                    focussed={true}
                    locked={false}
                    change={this.onTickerTextInputChange}
                />
                <Submit
                    btnVariant='contained'
                    btnColor='primary'
                    btnText='Calculate'
                    btnClick={this.submitHandler}
                />
                <IntrinsifyTable stockData={this.state.stockData} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentConfig: state.currentConfig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrentConfig: config =>
            dispatch(actions.setCurrentIntrinsifyConfig(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntrinsifyContainer);
