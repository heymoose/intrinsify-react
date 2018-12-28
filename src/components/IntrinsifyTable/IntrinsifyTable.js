import React, { Component } from 'react';
import { retrieveStockData } from './intrinsifyTableLogic';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css'

// TODO: Can add column generation to retrieveStockData.js and make more generic as well

class IntrinsifyTable extends Component {
    render () {
        const data = retrieveStockData(new Array(15).fill(null));
        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Ticker',
                accessor: 'ticker'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: 'Flat Estimate Growth',
                accessor: 'flatEstimateGrowth'
            },
            {
                Header: 'AAA Corporate Bond Yield',
                accessor: 'aaaCorpBondYield'
            },
            {
                Header: 'EPS',
                accessor: 'eps'
            },
            {
                Header: 'IV',
                accessor: 'iv'
            },
            {
                Header: 'NIV',
                accessor: 'niv'
            }
        ]
        return (
            <ReactTable
                className={style.ReactTable}
                data={data}
                columns={columns} />
        );
    }
}

export default IntrinsifyTable;