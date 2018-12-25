import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fetchUserContacts } from '../../ducks/contacts.duck';

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
    return (
      <ListItem button key={`contact_${c.id}`}>
        <ListItemText inset primary={`${c.firstName} ${c.lastName}:    ${c.phone}`}/>
      </ListItem>
    )
  }

  render() {
    const { contacts } = this.props;

    return (
      <List component="nav">
        {contacts.map((c) => this.getContactItem(c))}
      </List>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps),
  connect(mapActionsToProps)
);

export default enhance(ContactList);