import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider, Drawer, List, ListItem, Button, colors,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/AddCircle';
import StoreContext from '../contexts/store-context';
import usePromise from '../hooks/use-promise';


const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
    paddingTop: '3rem',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '0.75rem 1.25rem',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
    justifyContent: 'center',
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const Sidebar = (props) => {
  const {
    open, variant, onClose, className,
  } = props;

  const { findEntities } = React.useContext(StoreContext);

  const [entities] = usePromise(() => findEntities(), {
    defaultValue: [],
  });

  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/',
      icon: <DashboardIcon />,
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <List
          className={clsx(classes.root, className)}
        >
          {pages.map((page) => (
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                href={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
          ))}
          <Divider />
          {entities.map((entity) => (
            <ListItem
              className={classes.item}
              disableGutters
              key={entity.id}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                href={`/${entity.id}`}
              >
                <div className={classes.icon}>
                  {entity.pluralName[0]}
                </div>
                {entity.pluralName}
              </Button>
            </ListItem>
          ))}
          <ListItem
            className={classes.item}
            disableGutters
            key="new-entity"
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              href="/entity/new"
            >
              <div className={classes.icon}>
                <AddIcon />
              </div>
              New Entity
            </Button>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
