import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useProfile } from './../../hooks/useProfile';

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
  const [profile, setProfile] = useProfile();
  const [auth, setAuth] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    handleClose();
    // todo: pop open a dialog
    setProfile({ email: 'brad.ledbetter@gmail.com', name: 'Brad' });
    setAuth(true);
  };

  const handleSignOut = () => {
    handleClose();
    setProfile({ email: '', name: '' });
    setAuth(false);
  };

  const signInOrOut = () => {
    if (auth) {
      return <MenuItem onClick={handleSignOut}>Sign out</MenuItem>;
    }
    return <MenuItem onClick={handleSignIn}>Sign In</MenuItem>;
  };

  const welcomeMessage = () => {
    if (profile?.name) {
      return (
        <Typography variant="subtitle1" noWrap>
          Welcome, {profile.name}
        </Typography>
      );
    }
    return '';
  };

  return (
    <div>
      {welcomeMessage()}
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
