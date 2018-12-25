import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

class ContactList extends PureComponent {
  render() {
    return (
      <List component="nav">
        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>

        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>

        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>

        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>

        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>

        <ListItem button>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>
      </List>
    );
  }
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(ContactList);