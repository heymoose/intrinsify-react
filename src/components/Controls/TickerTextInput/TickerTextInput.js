import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './TickerTextInput.module.css';

class TickerTextInput extends Component {
    render() {
        return (
            <div>
                <input className={style.TextInput} type='text' />
            </div>
        );
    }
}

export default TickerTextInput;