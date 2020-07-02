import React from 'react';
import { useProfile, IProfile } from './useProfile';
import { render, RenderResult, fireEvent } from '@testing-library/react';

function renderMockComponent(): RenderResult {
  const MockComponent: React.FC<unknown> = () => {
    const [profile, setProfile] = useProfile();

    const submit = () => {
      setProfile({ name: profile?.name || '', email: profile?.email || '' });
    };

    return (
      <div>
        <p>{profile?.name}</p>
        <p>{profile?.email}</p>
        <button title="submit" type="button" onClick={submit}>
          submit
        </button>
      </div>
    );
  };

  return render(<MockComponent />);
}

describe(`userProfile hook`, () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
  });

  afterEach(() => {
    (window as any).localStorage = originalLocalStorage;
  });

  describe(`setting profile`, () => {
    let setItem: jest.Mock;
    beforeEach(() => {
      setItem = jest.fn();
      Object.defineProperty(window, 'localStorage', {
        writable: true,
        value: {
          getItem: jest.fn(),
          setItem,
        },
      });
    });

    it(`should store name and a hashed email in localStorage`, () => {
      const { getByTitle } = renderMockComponent();
      const btn = getByTitle('submit');

      fireEvent.click(btn);

      expect(setItem).toHaveBeenCalledWith(
        'beer-vote-profile',
        JSON.stringify({
          email: '',
          name: '',
        }),
      );
    });
  });

  describe(`getting profile`, () => {
    let profile: IProfile = {
      name: 'Brad',
      email: 'brad@okayestdeveloper.net',
    };
    let getItem = jest.fn().mockReturnValue(JSON.stringify(profile));

    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        writable: true,
        value: {
          getItem,
          setItem: jest.fn(),
        },
      });
    });

    it(`should pull profile from localStorage`, () => {
      const { getByText } = renderMockComponent();

      expect(getItem).toHaveBeenCalledWith('beer-vote-profile');

      expect(() => {
        const nameEl = getByText(profile.name);
        const emailEl = getByText(profile.email);
      }).not.toThrow();
    });
  });
});
