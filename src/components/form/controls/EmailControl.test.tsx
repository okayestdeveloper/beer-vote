import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import EmailControl from './EmailControl';
import { IFormControlProps } from '../form.types';
import Validators from '../form.validators';

function renderControl(args?: Partial<IFormControlProps>): RenderResult {
  const defaultProps: IFormControlProps = {
    initialValue: '',
    onChange: () => {},
    onValidation: undefined,
    validators: undefined,
    className: undefined,
    helperText: undefined,
    label: undefined,
    placeholder: undefined,
    disabled: false,
  };

  const props = { ...defaultProps, ...args };
  return render(<EmailControl {...props} />);
}

describe('EmailControl', () => {
  afterEach(cleanup);

  beforeEach(() => {});

  describe(`valueChanges`, () => {
    const oldVal = 'a@b.co';
    const newVal = 'b@c.co';
    let onChange: any;

    beforeEach(() => {
      onChange = jest.fn();
    });

    it(`should emit new value when the value changes`, () => {
      const { getByDisplayValue } = renderControl({
        initialValue: oldVal,
        onChange,
      });
      const input = getByDisplayValue(oldVal);

      fireEvent.change(input, { target: { value: newVal } });

      expect(onChange).toHaveBeenCalledWith(newVal);
    });

    it(`should not emit if disabled`, () => {
      const { getByDisplayValue } = renderControl({
        initialValue: oldVal,
        disabled: true,
        onChange,
      });
      const input = getByDisplayValue(oldVal);

      fireEvent.change(input, { target: { value: newVal } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe(`validationChanges`, () => {
    let onValidation: any;

    beforeEach(() => {
      onValidation = jest.fn();
    });

    it(`should not emit if disabled`, () => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        disabled: true,
        validators: [Validators.required],
        onValidation,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(onValidation).not.toHaveBeenCalled();
    });

    it(`should emit null per validation when validation finds no errors`, () => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        initialValue: '0',
        validators: [Validators.required, Validators.min(0)],
        onValidation,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(onValidation).toHaveBeenCalledWith({ required: null, min: null });
    });

    it(`should emit a validation object when there are errors`, () => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        initialValue: '0',
        validators: [Validators.required, Validators.min(10)],
        onValidation,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(onValidation).toHaveBeenCalledWith({
        required: null,
        min: expect.any(String),
      });
    });

    it(`should not emit if there are no validators`, () => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        onValidation,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(onValidation).not.toHaveBeenCalled();
    });

    it(`should override the helperText with an error string is invalid`, () => {
      const helperText = 'Enter an email';
      const { getByText, getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        helperText,
        validators: [Validators.required],
      });

      expect(() => getByText(helperText)).not.toThrow();

      const input = getByPlaceholderText('Email');
      fireEvent.blur(input);

      expect(() => getByText(helperText)).toThrow();
    });
  });

  describe(`props and configuration`, () => {
    const initialValue = 'a@b.co';
    it(`should initialize the value to initialValue prop`, () => {
      const { getByDisplayValue } = renderControl({
        placeholder: 'Email',
        initialValue,
      });
      expect(() => getByDisplayValue(initialValue)).not.toThrow();
    });

    it(`should add className if provided`, () => {
      const className = 'form-control';
      renderControl({
        placeholder: 'Email',
        className,
      });

      const elements = document.getElementsByClassName(className);

      expect(elements.length).toEqual(1);
    });

    it(`should add helperText if provided`, () => {
      const helperText = 'Enter an email';
      const { getByText } = renderControl({
        helperText,
      });

      expect(() => getByText(helperText)).not.toThrow();
    });

    it(`should add placeholder if provided, then fall back to label, then nothing`, () => {
      const placeholder = 'Enter an email';
      const { getByPlaceholderText } = renderControl({
        placeholder,
      });

      expect(() => getByPlaceholderText(placeholder)).not.toThrow();
    });

    it(`should use the provided label or default to "Email"`, () => {
      const label = 'label';
      const { getByText } = renderControl({
        label,
      });

      expect(() => getByText(label)).not.toThrow();
    });

    it(`should default label to "Email"`, () => {
      const { getByText } = renderControl({});

      expect(() => getByText('Email')).not.toThrow();
    });
  });
});
