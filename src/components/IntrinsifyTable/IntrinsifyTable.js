import React from 'react';
import { generateDummyStockData, generateColumns, mapIndicatorValue, mapIndicatorWidth} from './intrinsifyTableLogic';
import ReactTable from 'react-table';
import reactTableStyle from 'react-table/react-table.css'
import style from './IntrinsifyTable.module.css';

const intrinsifyTable = () => {
    const data = generateDummyStockData(25);
    const columns = generateColumns();
    const rivIndicatorColumn = columns.find(function(c) {
        return c.accessor === 'rivIndicator' 
    });

    rivIndicatorColumn.Cell = row => (
        <div
            style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#dadada',
            borderRadius: '2px'
            }}>
            <div
                style={{
                    width: mapIndicatorWidth(row.value),
                    height: '100%',
                    backgroundColor: mapIndicatorValue(row.value),
                    borderRadius: '2px',
                    transition: 'all .2s ease-out'
                }}
            />
        </div>
    );

    //debugger;

    return (
        <ReactTable
            className={[reactTableStyle.ReactTable, style.IntrinsifyTable].join(' ')}
            data={data}
            columns={columns} />
    );
}

export default intrinsifyTable;