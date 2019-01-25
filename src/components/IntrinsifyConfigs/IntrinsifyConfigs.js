import React from 'react';
import { connect } from 'react-redux';
import IntrinsifyConfig from './IntrinsifyConfig/IntrinsifyConfig';

const intrinsifyConfigs = props => {
    let configs = null;

    if (props.configs.length > 0) {
        configs = props.configs.map(config => {
            return <IntrinsifyConfig key={config.id} tickers={config.tickers} />;
        });
    }

    return <>{configs}</>;
};

const mapStateToProps = state => {
    return {
        configs: state.savedConfigs
    };
};

export default connect(mapStateToProps)(intrinsifyConfigs);
