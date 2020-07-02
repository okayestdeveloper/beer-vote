import {
  ControlValidationState,
  ControlValidatorFunction,
  ControlValidator,
} from './form.types';
import { isValidEmail } from './../../shared/utils';

const required: ControlValidator = (value: string): ControlValidationState => {
  if (value === null || value === undefined || value === '') {
    return { required: 'This field is required' };
  }

  return { required: null };
};

const email: ControlValidator = (value: string): ControlValidationState => {
  if (!isValidEmail(value)) {
    return { email: 'Please enter a valid email address' };
  }

  return { email: null };
};

const min: ControlValidatorFunction = (minValue: number): ControlValidator => {
  return (value: string): ControlValidationState => {
    const nValue = parseInt(value, 10);
    if (nValue < minValue) {
      return { min: `${nValue} is less than the minimum ${minValue}` };
    }

    return { min: null };
  };
};

const max: ControlValidatorFunction = (maxValue: number): ControlValidator => (
  value: string,
): ControlValidationState => {
  const nValue = parseInt(value, 10);
  if (nValue > maxValue) {
    return { max: `${nValue} is greater than the maximum ${maxValue}` };
  }

  return { max: null };
};

export default {
  required,
  email,
  min,
  max,
};
