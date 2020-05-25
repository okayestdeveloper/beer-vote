import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

import { ControlValidationState, FormControl } from '../form.types';
import { validationsEqual } from '../form.utils';

const EmailControl: FormControl = ({
  initialValue = '',
  valueChanges,
  validationChanges,
  validators,
  className,
  helperText,
  label = 'Email',
  placeholder,
  disabled = false,
}) => {
  const [value, setValue] = useState<string>(initialValue || '');
  const [valid, setValid] = useState<boolean>(true);
  const [validations, setValidations] = useState<ControlValidationState>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const {
        target: { value },
      } = event;
      setValue(value);
      valueChanges.next(value);
      // should I tack on the form name so I can add it in value changes?
      // Nah, handle that if I do a form group thing, maybe.
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
      validationChanges?.next(_validations);
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
