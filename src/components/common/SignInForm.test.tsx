import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import SignInForm, { ISignInProps } from './SignInForm';

function renderSignInForm(args?: ISignInProps): RenderResult {
  const defaultProps: ISignInProps = {
    onChange: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return render(<SignInForm {...props} />);
}

describe(`SignInForm`, () => {
  describe(`snapshots`, () => {
    it(`should render a form with email and name controls`, () => {
      const tree = renderer.create(<SignInForm onChange={jest.fn()} />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe(`form changes`, () => {
    let onChange: jest.Mock;
    let emailEl: HTMLInputElement;
    let nameEl: HTMLInputElement;

    beforeEach(() => {
      onChange = jest.fn();
      const { getByPlaceholderText } = renderSignInForm({ onChange });
      nameEl = getByPlaceholderText('Name') as HTMLInputElement;
      emailEl = getByPlaceholderText('Email') as HTMLInputElement;
    });

    afterEach(cleanup);

    it(`should call onChange with new name when name changes`, () => {
      const value = 'Frank';
      fireEvent.change(nameEl, { target: { value } });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ name: value }),
      );
    });

    it(`should call onChange with new email when email changes`, () => {
      const value = 'a@b.com';
      fireEvent.change(emailEl, { target: { value } });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ email: value }),
      );
    });

    it(`should call onChange with valid:false if form is invalid`, () => {
      fireEvent.change(emailEl, { target: { value: 'not good' } });
      fireEvent.blur(emailEl);

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ valid: false }),
      );
    });
  });
});
