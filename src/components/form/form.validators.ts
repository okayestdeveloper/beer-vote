import { ControlValidators } from './form.types';
import { isValidEmail } from './../../shared/utils';

const Validators: ControlValidators = {};

Validators.required = (value: string): string | null => {
  if (value === null || value === undefined || value === '') {
    return 'This field is required';
  }

  return null;
};

Validators.email = (value: string): string | null => {
  if (!isValidEmail(value)) {
    return 'Please enter a valid email address';
  }

  return null;
};

Validators.min = (minValue: number) => (value: string): string | null => {
  const nValue = parseInt(value, 10);
  if (nValue < minValue) {
    return `${nValue} is less than the minimum ${minValue}`;
  }

  return null;
};

Validators.max = (maxValue: number) => (value: string): string | null => {
  const nValue = parseInt(value, 10);
  if (nValue > maxValue) {
    return `${nValue} is greater than the maximum ${maxValue}`;
  }

  return null;
};

export default Validators;
