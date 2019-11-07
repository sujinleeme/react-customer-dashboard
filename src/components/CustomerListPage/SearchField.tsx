import * as React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchField = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search customer's name or email"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={onChange}
        inputProps={{ 'aria-label': 'search' }}
        />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white,0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white,0.25)
    },
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1,1,1,7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 250,
      '&:focus': {
        width: 300
      }
    }
  }
}));

export default SearchField;
