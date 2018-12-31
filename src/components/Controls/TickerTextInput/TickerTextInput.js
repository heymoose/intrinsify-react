import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './TickerTextInput.module.css';

class TickerTextInput extends Component {
    state = {
        focussed: (this.props.locked && this.props.focussed) || false,
        value: this.props.value || '',
        error: this.props.error || '',
        label: this.props.label || '',
    };

    onChange = event => {
        const { id } = this.props;
        const value = event.target.value;
        this.setState({ value, error: '' });
        return this.props.onChange(id, value);
    }

    render() {
        const { focussed, value, error, label } = this.state;
        const { id, type, locked } = this.props;
        const focussedStyle = (locked ? focussed : focussed || value) ? style.focussed : '';
        const lockedStyle = locked && !focussed ? style.locked : '';
        const fieldClassNames = [style.field];

        if (focussed) {
            fieldClassNames.push(focussedStyle);
        }

        if (locked) {
            fieldClassNames.push(lockedStyle);
        }

        return (
            <div className={fieldClassNames.join(' ')}>
                <input
                    id={id}
                    type={type}
                    value={value}
                    placeholder={label} 
                    onChange={this.onChange}
                    onFocus={() => !locked && this.setState({ focussed: true })}
                    onBlur={() => !locked && this.setState({ focussed: false })} />
                <label htmlFor={id} className={error && style.error}>
                    {error || label}
                </label>
            </div>
        );
    }
}

TickerTextInput.propTypes = {
    id: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    focussed: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
};

TickerTextInput.defaultProps = {
    locked: false,
    focussed: false,
    value: '',
    error: '',
    label: '',
    onChange: () => '',
 };

export default TickerTextInput;