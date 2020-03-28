import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));


const SearchInput = (props) => {
  const {
    className, onChange, style,
  } = props;

  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  );
};


SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};


SearchInput.defaultProps = {
  className: undefined,
  style: undefined,
};


export default SearchInput;
