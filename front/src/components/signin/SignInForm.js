import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { styles } from './styles';
import { updateState, signInRequest } from "../../ducks/auth.duck";

function mapStateToProps(state) {
  return {
    email: state.auth.logInEmail,
    password: state.auth.logInPassword
  };
}

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ updateState, signInRequest }, r.dispatch)
  }
}

class SignInForm extends PureComponent {
  render() {
    const { classes, email, password, actions } = this.props;

    return (
      <div>
        <TextField
          id="signInEmail"
          label="Email"
          className={classes.textField}
          value={email}
          type="email"
          onChange={(e) => actions.updateState({ logInEmail: e.target.value })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="signInPassword"
          label="Password"
          className={classes.textField}
          value={password}
          type="password"
          onChange={(e) => actions.updateState({ logInPassword: e.target.value })}
          margin="normal"
          variant="outlined"
        />

        <Button onClick={() => actions.signInRequest({ email, password })} variant="contained" color="primary"
                className={classes.button}>
          Signin
        </Button>
      </div>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps)
);

export default withStyles(styles)(enhance(SignInForm));