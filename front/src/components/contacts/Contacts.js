import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core";

import ContactList from './contactList/ContactList';
import ContactForm from './contactForm/ContactForm';
import { styles } from './styles';
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";

function mapStateToProps(state) {
  return {
    creatingContact: state.contacts.creatingContact
  };
}

class Contacts extends PureComponent {
  render() {
    const { classes, creatingContact } = this.props;
    return (
      <div className={classes.container}>
        {creatingContact && (
          <ContactForm/>
        )}
        <ContactList/>
      </div>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps)
);

export default withStyles(styles)(enhance(Contacts));