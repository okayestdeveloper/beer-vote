import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import UserMenu from './UserMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    menuIcon: {
      marginRight: theme.spacing(2),
    },
  }),
);

// todo: tests

const Header: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            Valkyrie Brewing
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
