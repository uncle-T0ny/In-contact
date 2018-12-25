import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Modal from '@material-ui/core/Modal';

import AppBar from './appBar/AppBar';
import ContactList from '../../components/contacts/ContactList';
import { openModal, closeModal, triggerDrawer } from '../../ducks/app.duck';
import { checkAuth } from '../../ducks/auth.duck';
import { mainListItems } from './listItems';
import { styles, getModalStyle } from './styles';


function mapStateToProps(state) {
  return {
    modalOpen: state.app.modalOpen,
    drawerOpen: state.app.drawerOpen,
    popupContent: state.app.popupContent
  };
}

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ openModal, closeModal, triggerDrawer, checkAuth }, r.dispatch)
  }
}

class Main extends React.PureComponent {
  componentDidMount() {
    const { actions } = this.props;
    actions.checkAuth();
  }

  render() {
    const { classes, modalOpen, drawerOpen, popupContent, actions } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>

        <AppBar />

        {/* Drawer, left menu */}
        <Drawer
          variant="permanent"
          classes={{
            paper: cn(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => actions.triggerDrawer()}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>{mainListItems}</List>
          <Divider/>
        </Drawer>

        <main className={classes.content}>
          <ContactList/>
        </main>

        {/* General modal */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={() => actions.closeModal()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            { popupContent }
          </div>
        </Modal>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps),
);

export default withStyles(styles)(enhance(Main));