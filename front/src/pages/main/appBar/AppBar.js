import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { openModal, triggerDrawer } from '../../../ducks/app.duck';
import { logOut } from '../../../ducks/auth.duck';
import SignInForm from '../../../components/signin/SignInForm';
import SignUpForm from '../../../components/signup/SignUpForm';

import { styles } from './../styles';

function mapStateToProps(state) {
  return {
    drawerOpen: state.app.drawerOpen,
    loggedIn: state.auth.loggedIn,
  };
}

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ openModal, triggerDrawer, logOut }, r.dispatch)
  }
}

class AppBar extends React.PureComponent {
  render() {
    const { classes, actions, drawerOpen, loggedIn } = this.props;

    return (
      <AppBarMaterial
        position="absolute"
        className={cn(classes.appBar, drawerOpen && classes.appBarShift)}
      >
        <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => actions.triggerDrawer()}
            className={cn(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon/>
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            InContact
          </Typography>

          {!loggedIn &&
          <Fragment>
            <Button onClick={() => actions.openModal({ content: <SignInForm/> })} color="inherit">Sign in</Button>
            <Button onClick={() => actions.openModal({ content: <SignUpForm/> })} color="inherit">Sign up</Button>
          </Fragment>
          }

          {loggedIn &&
          <Button onClick={() => actions.logOut()} color="inherit">Log out</Button>
          }
        </Toolbar>
      </AppBarMaterial>
    );
  }
}

AppBar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps),
);

export default withStyles(styles)(enhance(AppBar));