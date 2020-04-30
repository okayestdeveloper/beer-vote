import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

const UserMenu: React.FC<any> = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // todo: this is temporary. Replace with a custom hook, I think
  const [auth, setAuth] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    handleClose();
    // todo: replace with a setter on a custom hook that uses a sign in dialog component
    setAuth(true);
  };

  const handleSignOut = () => {
    handleClose();
    // todo: replace with a setter on a custom hook
    setAuth(false);
  };

  const signInOrOut = () => {
    if (auth) {
      return <MenuItem onClick={handleSignOut}>Sign out</MenuItem>;
    }
    return <MenuItem onClick={handleSignIn}>Register or Sign In</MenuItem>;
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className={classes.menuButton}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {signInOrOut()}
      </Menu>
    </div>
  );
};

export default UserMenu;
