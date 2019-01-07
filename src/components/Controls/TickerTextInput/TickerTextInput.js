import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const tickerTextInput = (props) => (
    <form>
        <TextField
            id="outlined-full-width"
            label="Tickers"
            style={{ margin: 8 }}
            placeholder="KO, DIS, GE"
            helperText="Enter tickers to calculate intrinsic value."
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={props.change}
            InputLabelProps={{
                shrink: true,
            }} />
    </form>
);

export default withStyles(styles)(tickerTextInput);