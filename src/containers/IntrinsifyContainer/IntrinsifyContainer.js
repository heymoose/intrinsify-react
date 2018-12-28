import React, { Component } from 'react';
import IntrinsifyTable from '../../components/IntrinsifyTable/IntrinsifyTable';

class IntrinsifyContainer extends Component {
    render() {
        return (
            <>
                <p>The text input box to input tickers</p>
                <p>The submit button</p>
                <IntrinsifyTable />
            </>
        );
    }
}

export default IntrinsifyContainer;