import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

import { ControlValidationState, FormControl } from '../form.types';
import { validationsEqual } from '../form.utils';

const TextControl: FormControl = ({
  initialValue = '',
  onChange,
  onValidation,
  validators,
  className,
  helperText,
  label,
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
      onChange(value);
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
      if (onValidation) {
        onValidation(_validations);
      }
    }
  };

  const validationMessage = (): string => {
    if (!valid) {
      const retVal = Object.keys(validations)
        .map((key) => {
          const val = validations[key];
          return !!val ? '' : val;
        })
        .join('');
      return retVal;
    }
    return '';
  };

  // note: Should I instead build this out with FormControl and the like and
  // build out my own validation message component?

  return (
    <TextField
      label={label || ''}
      name={label || 'text'}
      placeholder={placeholder || label || ''}
      value={value}
      onChange={handleChange}
      type="text"
      className={className || ''}
      onBlur={validate}
      error={!valid}
      disabled={!!disabled}
      helperText={!valid ? validationMessage() : helperText || ''}
    />
  );
};

export default TextControl;
