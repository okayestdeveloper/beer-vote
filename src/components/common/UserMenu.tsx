import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useProfile, IProfile } from './../../hooks/useProfile';
import SignInForm, { ISignInFormState } from './SignInForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuWrapper: {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      marginRight: theme.spacing(2),
    },
    signInFormContainer: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: '25rem',
    },
    signOutButton: {
      margin: theme.spacing(1),
    },
    signInButton: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      alignSelf: 'flex-end',
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
  const [formState, setFormState] = useState<ISignInFormState>({
    email: '',
    name: '',
    valid: true,
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExited = () => {
    const { email, name } = formState;
    setProfile({ email, name });
  };

  const handleClose = (event: object, reason: string) => {
    if ((profile?.email && profile?.name) || reason !== 'tabKeyDown') {
      setAnchorEl(null);
    }
  };

  const handleFormChange = (state: ISignInFormState) => {
    setFormState(state);
  };

  const handleSignOut = () => {
    setFormState({ email: '', name: '', valid: true });
    handleClose({}, '');
  };

  const handleSignIn = () => {
    handleClose({}, '');
  };

  const signOutMenu = (classes: ClassNameMap) => {
    return (
      <Button
        className={classes.signOutButton}
        variant="contained"
        color="primary"
        onClick={handleSignOut}
        data-testid="signOutButton"
      >
        Sign Out
      </Button>
    );
  };

  const signInFormPopover = (classes: ClassNameMap) => {
    return (
      <Box className={classes.signInFormContainer}>
        <SignInForm onChange={handleFormChange} data-testid="signInForm" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!formState.valid}
          className={classes.signInButton}
          onClick={handleSignIn}
          data-testid="signInButton"
        >
          Sign In
        </Button>
      </Box>
    );
  };

  const signInOrOut = (profile: IProfile | null, classes: ClassNameMap) => {
    if (profile?.name) {
      return signOutMenu(classes);
    }

    return signInFormPopover(classes);
  };

  const welcomeMessage = (profile: IProfile | null, classes: ClassNameMap) => {
    if (profile?.name) {
      return (
        <Typography
          variant="subtitle1"
          noWrap
          className={classes.welcomeMessage}
          data-testid="welcomeMessage"
        >
          Welcome, {profile.name}
        </Typography>
      );
    }
    return '';
  };

  return (
    <Box className={classes.menuWrapper}>
      {welcomeMessage(profile, classes)}
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
        onExited={handleExited}
      >
        {signInOrOut(profile, classes)}
      </Popover>
    </Box>
  );
};

export default UserMenu;
