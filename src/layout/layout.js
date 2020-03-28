import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography, Hidden, useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './sidebar';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: 'calc(100% - 64px)',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  appBar: {
    height: 64,
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    backgroundColor: '#F1F4F6',
    padding: '2rem',
    height: '100%',
  },
  title: {
    fontSize: '1.2rem',
    padding: 0,
    fontWeight: 'bold',
  },
}));


const Layout = (props) => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;


  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>

          <Hidden lgUp>
            <IconButton onClick={handleSidebarOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h1" className={classes.title}>
            Oryx Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />

      <main className={clsx(classes.content, isDesktop && classes.shiftContent)}>
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
