import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react';

import UserMenu from './UserMenu';

function renderUserMenu(): RenderResult {
  return render(<UserMenu />);
}

describe(`UserMenu`, () => {
  // note: snapshot testing with Material-UI is a huge PITA, so I avoid it
  let originalLocalStorage: Storage;
  let getItem: jest.Mock;
  let profile: string | null = null;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;

    getItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem,
        setItem: jest.fn((key, val) => {
          profile = val;
        }),
      },
    });
  });

  afterEach(() => {
    (window as any).localStorage = originalLocalStorage;
  });

  describe(`with empty profile`, () => {
    beforeEach(() => {
      getItem.mockReturnValue(null);
    });

    it(`should display a sign in button`, () => {
      const { getByTestId } = renderUserMenu();
      expect(() => getByTestId('signInButton')).not.toThrow();
    });

    it(`should not display a sign out button`, () => {
      const { queryByTestId } = renderUserMenu();
      expect(queryByTestId('signOutButton')).toBeNull();
    });
  });

  describe(`with non-empty profile`, () => {
    beforeEach(() => {
      getItem.mockReturnValue(
        JSON.stringify({
          name: 'Brad',
          email: 'brad@okayestdeveloper.net',
        }),
      );
    });

    it(`should not display a sign in button`, () => {
      const { queryByTestId } = renderUserMenu();
      expect(queryByTestId('Sign In')).toBeNull();
    });

    it(`should display a sign out button`, () => {
      const { getByTestId } = renderUserMenu();
      expect(() => getByTestId('signOutButton')).not.toThrow();
    });
  });

  // todo: circle back to these at some point. I might figure out how to make them work by working on other things
  xdescribe(`signing in`, () => {
    let menuResult: RenderResult;
    beforeEach(() => {
      getItem.mockReturnValue(profile);
      menuResult = renderUserMenu();
      const { getByLabelText } = menuResult;
      const iconBtn = getByLabelText('account of current user');
      fireEvent.click(iconBtn);
    });

    it(`should close the menu`, () => {
      const { getByPlaceholderText, getByText, getByTestId } = menuResult;
      const nameEl = getByPlaceholderText('Name') as HTMLInputElement;
      const emailEl = getByPlaceholderText('Email') as HTMLInputElement;
      const signInButton = getByTestId('signInButton') as HTMLButtonElement;

      const name = 'Brad';
      nameEl.value = name;
      emailEl.value = 'brad@okayestdeveloper.net';
      fireEvent.change(nameEl, { target: { value: name } });
      fireEvent.change(emailEl, { target: { value: emailEl.value } });

      const form = getByTestId('signInForm'); // note: unable to find element
      fireEvent.change(form, { name, email: 'a@babel.com', valid: true });
      // todo: the change event isn't bubbling up to the user menu, of course.
      // This is the weakness in testing this way, IMO. "Testing how your users use it"
      // leads to challenges when the test domain can't do everything a real
      // browser does
      fireEvent.click(signInButton);

      return wait(() => getByText(`Welcome, ${name}`));
    });

    it(`should set profile with values from the form state`, () => {
      expect(false).toEqual(true);
    });
  });

  xdescribe(`signing out`, () => {
    beforeEach(() => {
      getItem.mockReturnValue(
        JSON.stringify({
          name: 'Brad',
          email: 'brad@okayestdeveloper.net',
        }),
      );
    });

    it(`should close the menu`, () => {
      expect(false).toEqual(true);
    });

    it(`should set profile with empty name and email`, () => {
      expect(false).toEqual(true);
    });
  });

  xdescribe(`when signed in`, () => {
    it(`should show a welcome message`, () => {
      expect(false).toEqual(true);
    });

    it(`should have a sign out button when the menu is open`, () => {
      expect(false).toEqual(true);
    });
  });

  xdescribe(`when signed out`, () => {
    it(`should not show a welcome message`, () => {
      expect(false).toEqual(true);
    });

    it(`should open the menu on click`, () => {
      expect(false).toEqual(true);
    });

    it(`should show the sign in form when the menu is open`, () => {
      expect(false).toEqual(true);
    });
  });
});
