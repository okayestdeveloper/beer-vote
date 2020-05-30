import React, {
  useState,
  FocusEvent,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { IProfile } from './../../hooks/useProfile';
import EmailControl from './../form/controls/EmailControl';
import Validators from './../form/form.validators';

// todo: tests

export interface ISignInProps {
  signIn: (profile: IProfile) => void;
  visible: boolean;
}

interface ISignInFormState extends IProfile {
  nameError: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
  const formControl = {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  };
  return createStyles({
    signInFormContainer: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: '25rem',
    },
    signInForm: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    formControl,
    submitButton: {
      ...formControl,
      alignSelf: 'flex-end',
    },
  });
});

const SignInForm: React.FC<ISignInProps> = ({ signIn, visible }) => {
  const [formState, setFormState] = useState<ISignInFormState>({
    email: '',
    name: '',
    nameError: false,
  });

  const classes = useStyles();

  // note: this is my hacky workaround for an "on show"
  useEffect(() => {
    // todo: handle resetting the form when showing
    // todo: handle focusing the email input when showing
    console.log(`SignInForm visibility: ${visible ? 'visible' : 'hidden'}`);
  }, [visible]);

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(formState);
  };

  // todo: create email and name components and have them validate themselves

  const validate = (event: FocusEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'name':
        if (!event.target.value) {
          setFormState({ ...formState, nameError: true });
        } else {
          setFormState({ ...formState, nameError: false });
        }
        break;
    }
  };

  const handleEmailChange = (email: string) => {
    setFormState({ ...formState, email });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.id) {
      setFormState({ ...formState, [event.target.id]: event.target.value });
    }
  };

  return (
    <Box className={classes.signInFormContainer}>
      <Typography variant="body1">Sign In</Typography>
      <form onSubmit={handleSignIn} className={classes.signInForm}>
        <EmailControl
          label="Email"
          onChange={handleEmailChange}
          validators={[Validators.required, Validators.email]}
          className={classes.formControl}
        />
        <TextField
          label="Name"
          value={formState.name}
          onChange={handleChange}
          id="name"
          required
          className={classes.formControl}
          onBlur={validate}
          error={formState.nameError}
          helperText={formState.nameError ? 'Please enter your name.' : ''}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
