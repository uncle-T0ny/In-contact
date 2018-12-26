export const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fieldName: {
    display: 'inline-block',
    color: theme.palette.text.secondary,
  },
  fieldValue: {
    display: 'inline-block'
  },
  fab: {
    margin: theme.spacing.unit
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});