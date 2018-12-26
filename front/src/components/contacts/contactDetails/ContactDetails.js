import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';


import { styles } from './styles';
import { deleteContact } from "../../../ducks/contacts.duck";

function mapActionsToProps(state, r) {
  return {
    actions: bindActionCreators({ deleteContact }, r.dispatch)
  }
}

class ContactDetails extends PureComponent {
  getField(name, value) {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography className={classes.fieldName}>
          {name}:
        </Typography>
        {' '}
        <Typography className={classes.fieldValue}>
          {value}
        </Typography>
      </Fragment>
    )
  }

  render() {
    const { classes, actions, id, town, postcode, street, build, apartment, state, country } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs>
            {this.getField('Town', town)}
          </Grid>
          <Grid item xs>
            {this.getField('Street', street)}
          </Grid>
          <Grid item xs>
            {this.getField('Build', build)}
          </Grid>
          <Grid item xs>
            {this.getField('Apartment', apartment)}
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            {this.getField('Country', country)}
          </Grid>
          <Grid item xs>
            {this.getField('State', state)}
          </Grid>
          <Grid item xs>
            {this.getField('ZIP', postcode)}
          </Grid>
          <Grid item xs />
        </Grid>

        <div className={classes.actions}>
          <Fab onClick={() => actions.deleteContact({ id })} aria-label="Delete" className={classes.fab}>
            <DeleteIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  connect(mapActionsToProps)
);

export default withStyles(styles)(enhance(ContactDetails));