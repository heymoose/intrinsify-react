import React from 'react';
import { generateDummyStockData, generateColumns } from './intrinsifyTableLogic';
import ReactTable from 'react-table';
import reactTableStyle from 'react-table/react-table.css'
import style from './IntrinsifyTable.module.css';

const intrinsifyTable = (props) => {
    const data = props.dummyData === true
        ? generateDummyStockData(25)
        : generateDummyStockData(1);
        
    const columns = generateColumns();

    return (
        <>
            <p style={{marginTop: '20px'}}>{ props.dummyData === true ? 'Showing dummy data' : null }</p>
            <ReactTable
                className={[reactTableStyle.ReactTable, style.IntrinsifyTable].join(' ')}
                data={data}
                columns={columns} />
        </>
    );
}

export default intrinsifyTable;