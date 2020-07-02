import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { IProfile } from './../../hooks/useProfile';
import EmailControl from './../form/controls/EmailControl';
import TextControl from './../form/controls/TextControl';
import Validators from './../form/form.validators';
import { ControlValidationState } from '../form/form.types';

// todo: tests
export interface ISignInFormState extends IProfile {
  valid: boolean;
}

export interface ISignInProps {
  onChange: (formState: ISignInFormState) => void;
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    signInForm: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  });
});

const SignInForm: React.FC<ISignInProps> = ({ onChange }) => {
  const [formState, setFormState] = useState<ISignInFormState>({
    email: '',
    name: '',
    valid: true,
  });

  const classes = useStyles();

  const handleChange = (key: string, value: string) => {
    const newState = { ...formState, [key]: value };
    setFormState(newState);
    onChange(newState);
  };

  const handleValidation = (validation: ControlValidationState) => {
    const valid = Object.keys(validation).reduce(
      (result: boolean, key: string) => result && validation[key] === null,
      true,
    );
    const newState = { ...formState, valid };
    setFormState(newState);
    onChange(newState);
  };

  return (
    <>
      <Typography variant="body1">Sign In</Typography>
      <form className={classes.signInForm}>
        <EmailControl
          label="Email"
          onChange={(value) => handleChange('email', value)}
          onValidation={handleValidation}
          validators={[Validators.required, Validators.email]}
          className={classes.formControl}
        />
        <TextControl
          label="Name"
          initialValue={formState.name}
          onChange={(value) => handleChange('name', value)}
          onValidation={handleValidation}
          className={classes.formControl}
          validators={[Validators.required]}
        />
      </form>
    </>
  );
};

export default SignInForm;
