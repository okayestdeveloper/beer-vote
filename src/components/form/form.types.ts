import React from 'react';
import { Subject } from 'rxjs';

export interface ControlValidation {
  [validationKey: string]: boolean;
}

export type ControlValidator = (value: string) => string | null;
export type ControlValidatorFunction = (...args: any[]) => ControlValidator;

export interface ControlValidators {
  [validationKey: string]: ControlValidator | ControlValidatorFunction;
}

export interface ControlValidationState {
  [validationKey: string]: string | null;
}

export interface IFormControlProps {
  initialValue?: string;
  valueChanges: Subject<string>;
  validationChanges?: Subject<ControlValidation>;
  validators?: ControlValidators;
  className?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type FormControl = React.FC<IFormControlProps>;
