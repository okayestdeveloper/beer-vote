import React from 'react';
import { Subject } from 'rxjs';

export interface ControlValidationState {
  [validationKey: string]: string | null;
}

export type ControlValidator = (value: string) => ControlValidationState;
export type ControlValidatorFunction = (...args: any[]) => ControlValidator;

export interface IFormControlProps {
  initialValue?: string;
  valueChanges: Subject<string>;
  validationChanges?: Subject<ControlValidationState>;
  validators?: Array<ControlValidator | ControlValidatorFunction>;
  className?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type FormControl = React.FC<IFormControlProps>;
