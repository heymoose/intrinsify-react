import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TickerTextInput from '../../components/Controls/TickerTextInput/TickerTextInput';
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';
import * as actions from '../../store/actions/index';
import MaterialButton from '../../components/UI/MaterialButton/MaterialButton';
import style from './IntrinsifyContainer.module.css';

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
        const buttonStyles = [style.IntrinsifyButton].join(' ');

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
                <div>
                    <MaterialButton
                        variant='contained'
                        color='primary'
                        text='Calculate'
                        click={this.submitHandler}
                        classes={buttonStyles}
                    />
                    <MaterialButton
                        variant='contained'
                        text='Save'
                        click={this.submitHandler}
                        classes={buttonStyles}
                    />
                </div>
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
