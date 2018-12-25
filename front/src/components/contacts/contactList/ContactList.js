import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import { fetchUserContacts } from '../../../ducks/contacts.duck';
import { styles } from './styles';

function mapStateToProps(state) {
  return {
    contacts: state.contacts.list
  };
}

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ fetchUserContacts }, r.dispatch)
  }
}

class ContactList extends PureComponent {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchUserContacts();
  }

  getContactItem(c) {
    const { classes } = this.props;

    return (
      <ExpansionPanel key={`contact_item_${c.id}`}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{c.firstName}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{c.lastName}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{c.phone}</Typography>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.details}>
          address details
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  render() {
    const { contacts } = this.props;

    return contacts.map((c) => this.getContactItem(c));
  }
}

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps)
);

export default withStyles(styles)(enhance(ContactList));