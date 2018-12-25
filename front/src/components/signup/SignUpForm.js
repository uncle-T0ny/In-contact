import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { styles } from './styles';
import { updateState, signUpRequest } from "../../ducks/auth.duck";

function mapStateToProps(state) {
  return {
    email: state.auth.signUpEmail,
    password: state.auth.signUpPassword
  };
}

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ updateState, signUpRequest }, r.dispatch)
  }
}

class SignUpForm extends PureComponent {
  render() {
    const { classes, email, password, actions } = this.props;

    return (
      <div>
        <TextField
          id="signUpEmail"
          label="Email"
          className={classes.textField}
          value={email}
          type="email"
          onChange={(e) => actions.updateState({ signUpEmail: e.target.value })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="signUpPassword"
          label="Password"
          className={classes.textField}
          value={password}
          type="password"
          onChange={(e) => actions.updateState({ signUpPassword: e.target.value })}
          margin="normal"
          variant="outlined"
        />

        <Button onClick={() => actions.signUpRequest({ email, password })} variant="contained" color="primary"
                className={classes.button}>
          signup
        </Button>
      </div>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps)
);

export default withStyles(styles)(enhance(SignUpForm));