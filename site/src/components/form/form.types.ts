import React from 'react';

export interface ControlValidationState {
  [validationKey: string]: string | null;
}

export type ControlValidator = (value: string) => ControlValidationState;
export type ControlValidatorFunction = (...args: any[]) => ControlValidator;

export interface IFormControlProps {
  initialValue?: string;
  onChange: (value: string) => void;
  onValidation?: (state: ControlValidationState) => void;
  validators?: Array<ControlValidator | ControlValidatorFunction>;
  className?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type FormControl = React.FC<IFormControlProps>;
