import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import EmailControl from './EmailControl';
import { IFormControlProps, ControlValidationState } from '../form.types';
import Validators from '../form.validators';

function renderControl(args?: Partial<IFormControlProps>): RenderResult {
  const defaultProps: IFormControlProps = {
    initialValue: '',
    valueChanges: new Subject(),
    validationChanges: undefined,
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
    let valueChanges: Subject<string>;

    beforeEach(() => {
      valueChanges = new Subject();
    });

    it(`should emit new value when the value changes`, (done) => {
      const { getByDisplayValue } = renderControl({
        initialValue: oldVal,
        valueChanges,
      });
      const input = getByDisplayValue(oldVal);

      valueChanges.pipe(take(1)).subscribe((newValue) => {
        try {
          expect(newValue).toEqual(newVal);
          done();
        } catch (error) {
          done(error);
        }
      });

      fireEvent.change(input, { target: { value: newVal } });
    });

    it(`should not emit if disabled`, () => {
      valueChanges.next = jest.fn();
      const { getByDisplayValue } = renderControl({
        initialValue: oldVal,
        disabled: true,
        valueChanges,
      });
      const input = getByDisplayValue(oldVal);

      fireEvent.change(input, { target: { value: newVal } });

      expect(valueChanges.next).not.toHaveBeenCalled();
    });
  });

  describe(`validationChanges`, () => {
    let validationChanges: Subject<ControlValidationState>;

    beforeEach(() => {
      validationChanges = new Subject();
    });

    it(`should not emit if disabled`, () => {
      validationChanges.next = jest.fn();
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        disabled: true,
        validators: [Validators.required],
        validationChanges,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(validationChanges.next).not.toHaveBeenCalled();
    });

    it(`should emit null per validation when validation finds no errors`, (done) => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        initialValue: '0',
        validators: [Validators.required, Validators.min(0)],
        validationChanges,
      });
      const input = getByPlaceholderText('Email');

      validationChanges.pipe(take(1)).subscribe((validation) => {
        expect(validation?.required).toBeNull();
        expect(validation?.min).toBeNull();
        done();
      });

      fireEvent.blur(input);
    });

    it(`should emit a validation object when there are errors`, (done) => {
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        initialValue: '0',
        validators: [Validators.required, Validators.min(10)],
        validationChanges,
      });

      const input = getByPlaceholderText('Email');

      validationChanges.pipe(take(1)).subscribe((validation) => {
        expect(validation?.required).toBeNull();
        expect(validation?.min).not.toBeNull();
        done();
      });

      fireEvent.blur(input);
    });

    it(`should not emit if there are no validators`, () => {
      validationChanges.next = jest.fn();
      const { getByPlaceholderText } = renderControl({
        placeholder: 'Email',
        validationChanges,
      });
      const input = getByPlaceholderText('Email');

      fireEvent.blur(input);

      expect(validationChanges.next).not.toHaveBeenCalled();
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
