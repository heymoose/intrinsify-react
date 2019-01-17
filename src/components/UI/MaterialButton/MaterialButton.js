import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const materialButton = (props) => {
  return (
    <div>
      <Button variant={props.variant} color={props.color} onClick={props.click}>
        {props.text}
      </Button>
    </div>
  );
}

export default withStyles(styles)(materialButton);