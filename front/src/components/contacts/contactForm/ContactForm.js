import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown } from 'react-country-region-selector';

import { styles } from './styles';
import { updateState, closeNewContactForm, createContact } from "../../../ducks/contacts.duck";

function mapStateToProps(state) {
  return {
    firstName: state.contacts.firstName,
    lastName: state.contacts.lastName,
    phone: state.contacts.phone,
    town: state.contacts.town,
    postcode: state.contacts.postcode,
    street: state.contacts.street,
    build: state.contacts.build,
    apartment: state.contacts.apartment,
    state: state.contacts.state,
    country: state.contacts.country,
  };
}


function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ updateState, closeNewContactForm, createContact }, r.dispatch)
  }
}

class ContactForm extends PureComponent {
  render() {
    const { classes, actions, firstName, lastName, phone, town, postcode, street, build, apartment, state, country } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary>
            Create new contact
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Grid container spacing={24}>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="First Name"
                  className={classes.textField}
                  value={firstName}
                  type="text"
                  onChange={(e) => actions.updateState({ firstName: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Last Name"
                  className={classes.textField}
                  value={lastName}
                  type="text"
                  onChange={(e) => actions.updateState({ lastName: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  className={classes.textField}
                  value={phone}
                  type="text"
                  onChange={(e) => actions.updateState({ phone: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <CountryDropdown
                  value={country}
                  className={classes.countryDropdown}
                  valueType="short"
                  onChange={(val) => actions.updateState({ country: val })} />
              </Grid>

              <Grid item xs={3} sm={2}>
                <TextField
                  label="State"
                  className={classes.textField}
                  value={state}
                  type="text"
                  onChange={(e) => actions.updateState({ state: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  label="Town"
                  className={classes.textField}
                  value={town}
                  type="text"
                  onChange={(e) => actions.updateState({ town: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>


              <Grid item xs={3} sm={2}>
                <TextField
                  label="ZIP code"
                  className={classes.textField}
                  value={postcode}
                  type="text"
                  onChange={(e) => actions.updateState({ postcode: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Street"
                  className={classes.textField}
                  value={street}
                  type="text"
                  onChange={(e) => actions.updateState({ street: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={3} sm={2}>
                <TextField
                  label="Build"
                  className={classes.textField}
                  value={build}
                  type="text"
                  onChange={(e) => actions.updateState({ build: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  label="Apartment"
                  className={classes.textField}
                  value={apartment}
                  type="text"
                  onChange={(e) => actions.updateState({ apartment: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>


            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button onClick={() => actions.closeNewContactForm()} size="small">Cancel</Button>
            <Button onClick={() => actions.createContact()} size="small" color="primary">
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps)
);

export default withStyles(styles)(enhance(ContactForm));