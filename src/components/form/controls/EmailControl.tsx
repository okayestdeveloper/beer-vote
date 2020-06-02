import React, { useState, ChangeEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { ControlValidationState, FormControl } from '../form.types';
import { validationsEqual } from '../form.utils';
import Validators from './../form.validators';

const EmailControl: FormControl = ({
  initialValue = '',
  onChange,
  onValidation,
  validators = [Validators.email],
  className,
  helperText,
  label = 'Email',
  placeholder,
  disabled = false,
}) => {
  const [value, setValue] = useState<string>(initialValue || '');
  const [valid, setValid] = useState<boolean>(true);
  const [validations, setValidations] = useState<ControlValidationState>({});

  useEffect(() => {
    // Add in the email validator if there are validators. This allows the user
    // to remove all validation, but requires email validation if any validation
    // is added.
    if (validators && validators.length > 0) {
      const found = validators.find(
        (validator) => validator === Validators.email,
      );
      if (!found) {
        validators.push(Validators.email);
      }
    }
  }, [validators]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const {
        target: { value },
      } = event;
      setValue(value);
      onChange(value);
    }
  };

  const validate = () => {
    if (disabled) {
      return;
    }

    if (!validators || validators.length === 0) {
      setValid(true);
      return;
    }

    let _validations: ControlValidationState = {};

    _validations = validators.reduce(
      (result, validator) => ({ ...result, ...validator(value) }),
      {},
    );

    const _valid = Object.keys(_validations).reduce(
      (result: boolean, key: string) => result && _validations[key] === null,
      true,
    );

    setValid(_valid);

    if (!validationsEqual(_validations, validations)) {
      setValidations(_validations);
      if (onValidation) {
        onValidation(_validations);
      }
    }
  };

  // note: I'm validating on blur here because it's less processor intensive then validating on change.
  // That said, validators are usually simple and limited in number, so it might not be that heavy in real use.
  // At some point, it may be useful to provide a {validateOnChange: boolean} option.

  return (
    <TextField
      label={label || 'Email'}
      name={label || 'email'}
      placeholder={placeholder || label || ''}
      value={value}
      onChange={handleChange}
      type="email"
      className={className || ''}
      onBlur={validate}
      error={!valid}
      disabled={!!disabled}
      helperText={
        !valid ? 'Please enter a valid email address.' : helperText || ''
      }
    />
  );
};

export default EmailControl;
