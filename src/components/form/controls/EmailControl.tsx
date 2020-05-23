import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

import { ControlValidationState, FormControl } from '../form.types';
import { validationsEqual } from '../form.utils';

const EmailControl: FormControl = ({
  initialValue,
  valueChanges,
  validationChanges,
  validators,
  className,
  helperText,
  label,
  placeholder,
  disabled,
}) => {
  const [value, setValue] = useState<string>(initialValue || '');
  const [valid, setValid] = useState<boolean>(true);
  const [validations, setValidations] = useState<ControlValidationState>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
    valueChanges.next(value);
  };

  const validate = () => {
    let _validations = {};
    let _valid = true;

    if (validators) {
      const validatorNames = Object.keys(validators || {});
      _validations = validatorNames.reduce((val, key) => {
        const result = validators[key](value);
        _valid = _valid && result === null;
        return { ...val, [key]: result };
      }, {});
    }

    setValid(_valid);

    if (!validationsEqual(_validations, validations)) {
      setValidations(_validations);
      validationChanges?.next(_validations);
    }
  };

  // note: I'm validating on blur here because it's less processor intensive then validating on change.
  // That said, validators are usually simple and limited in number, so it might not be that heavy in real use.
  // At some point, it may be useful to provide a {validateOnChange: boolean} option.

  <TextField
    label={label || 'Email'}
    placeholder={placeholder || label || ''}
    value={value}
    onChange={handleChange}
    type="email"
    required
    className={className || ''}
    onBlur={validate}
    error={!valid}
    disabled={!!disabled}
    helperText={
      !valid ? 'Please enter a valid email address.' : helperText || ''
    }
  />;

  return <div></div>;
};

export default EmailControl;
