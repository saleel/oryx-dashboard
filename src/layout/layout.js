import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography, makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  content: {
    backgroundColor: '#F1F4F6',
    height: '100%',
    padding: '2rem',
  },
}));


const Layout = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Oryx Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
