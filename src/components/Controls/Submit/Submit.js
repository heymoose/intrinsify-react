import React from 'react';
import MaterialButton from '../../UI/MaterialButton/MaterialButton';

const Submit = (props) => (
    <MaterialButton
        variant={props.btnVariant}
        color={props.btnColor}
        text={props.btnText}
        click={props.btnClick} />
);

export default Submit;