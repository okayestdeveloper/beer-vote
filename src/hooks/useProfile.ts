import { useState, useEffect } from 'react';
import crypto from 'crypto';

// todo: tests

const salt = process.env.REACT_APP_SALT;

type ProfileHook = () => [IProfile | null, (p: IProfile) => void];

export interface IProfile {
  email: string; // actually a hash of the email
  name: string;
}

const defaultProfile: IProfile = { email: '', name: '' };

export const useProfile: ProfileHook = () => {
  const storageKey = 'beer-vote-profile';
  const [profile, setProfile] = useState<IProfile | null>(null);

  const hashEmail = (email: string): string => {
    const hash = crypto.createHash('sha256');
    hash.update(email + salt);
    return hash.digest('hex');
  };

  const handleSetProfile = ({ email, name }: IProfile) => {
    const _profile = { email: email ? hashEmail(email) : '', name };
    window.localStorage.setItem(storageKey, JSON.stringify(_profile));
    setProfile(_profile);
  };

  useEffect(() => {
    const strProfile = window.localStorage.getItem(storageKey);
    const _profile: IProfile = strProfile
      ? JSON.parse(strProfile)
      : defaultProfile;
    setProfile(_profile);
  }, []);

  return [profile, handleSetProfile];
};
