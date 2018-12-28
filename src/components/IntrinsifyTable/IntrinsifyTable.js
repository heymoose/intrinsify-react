import React, { Component } from 'react';
import { generateDummyStockData, generateColumns } from './intrinsifyTableLogic';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css'

class IntrinsifyTable extends Component {
    render () {
        const data = generateDummyStockData(15);
        const columns = generateColumns();

        return (
            <ReactTable
                className={style.ReactTable}
                data={data}
                columns={columns} />
        );
    }
}

export default IntrinsifyTable;