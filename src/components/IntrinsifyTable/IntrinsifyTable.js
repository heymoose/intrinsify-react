import React from 'react';
import { generateDummyStockData, generateColumns } from './intrinsifyTableLogic';
import ReactTable from 'react-table';
import reactTableStyle from 'react-table/react-table.css'
import style from './IntrinsifyTable.module.css';

const intrinsifyTable = () => {
    const data = generateDummyStockData(25);
    const columns = generateColumns();

    return (
        <ReactTable
            className={[reactTableStyle.ReactTable, style.IntrinsifyTable].join(' ')}
            data={data}
            columns={columns} />
    );
}

export default intrinsifyTable;