import React, { Component } from 'react';
import { generateDummyStockData, generateColumns, generateTableData } from './intrinsifyTableLogic';
import { arraysEqual } from '../../jsUtils/arrayUtils';
import ReactTable from 'react-table';
import reactTableStyle from 'react-table/react-table.css'
import style from './IntrinsifyTable.module.css';

class IntrinsifyTable extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const curTickers = this.props.stockData.map(stock => {
            return stock.ticker;
        });
        const nextTickers = nextProps.stockData.map(stock => {
            return stock.ticker;
        });

        return !arraysEqual(curTickers, nextTickers);
    }

    render() {
        const data = this.props.dummyData === true
            ? generateDummyStockData(25)
            : generateTableData(this.props.stockData);
            
        const columns = generateColumns();
    
        return (
            <>
                <p style={{marginTop: '20px'}}>{ this.props.dummyData === true ? 'Showing dummy data' : null }</p>
                <ReactTable
                    className={[reactTableStyle.ReactTable, style.IntrinsifyTable].join(' ')}
                    data={data}
                    columns={columns} />
            </>
        );
    }
}

export default IntrinsifyTable;