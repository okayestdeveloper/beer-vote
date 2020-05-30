import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useProfile, IProfile } from './../../hooks/useProfile';
import SignInForm from './SignInForm';

// todo: tests

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuWrapper: {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      marginRight: theme.spacing(2),
    },
    signOutButton: {
      margin: theme.spacing(1),
    },
    welcomeMessage: {
      marginRight: theme.spacing(1),
    },
  }),
);

const UserMenu: React.FC<any> = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profile, setProfile] = useProfile();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: object, reason: string) => {
    if (profile?.name || reason !== 'tabKeyDown') {
      setAnchorEl(null);
    }
  };

  const handleSignIn = ({ email, name }: IProfile) => {
    handleClose({}, '');
    setProfile({ email, name });
  };

  const handleSignOut = () => {
    handleClose({}, '');
    setProfile({ email: '', name: '' });
  };

  const signOutMenu = () => {
    return (
      <Button
        className={classes.signOutButton}
        variant="contained"
        color="primary"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    );
  };

  const signInFormPopover = () => {
    return <SignInForm signIn={handleSignIn} visible={Boolean(anchorEl)} />;
  };

  const signInOrOut = () => {
    if (profile?.name) {
      return signOutMenu();
    }

    return signInFormPopover();
  };

  const welcomeMessage = () => {
    if (profile?.name) {
      return (
        <Typography
          variant="subtitle1"
          noWrap
          className={classes.welcomeMessage}
        >
          Welcome, {profile.name}
        </Typography>
      );
    }
    return '';
  };

  return (
    <Box className={classes.menuWrapper}>
      {welcomeMessage()}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Popover
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
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
      </Popover>
    </Box>
  );
};

export default UserMenu;
