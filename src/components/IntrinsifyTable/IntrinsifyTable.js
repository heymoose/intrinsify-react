import React, { Component } from 'react';
import { retrieveStockData } from './retrieveStockData';
import ReactTable from 'react-table';

class IntrinsifyTable extends Component {
    render () {
        const data = retrieveStockData(new Array(15));
        console.log(data);
        return (
            <p>The IntrinsifyTable Component</p>
        );
    }
}

export default IntrinsifyTable;