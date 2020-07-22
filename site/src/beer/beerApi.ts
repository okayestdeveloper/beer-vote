import { IBeer } from './beerTypes';
import { IProfile } from './../hooks/useProfile';
import { handleAPIResponse } from '../shared/utils';

function apiUrl(path: string): string {
  const host = `${process.env.REACT_APP_API_HOST}`;
  const project = process.env.REACT_APP_FIREBASE_PROJECT
    ? `/${process.env.REACT_APP_FIREBASE_PROJECT}`
    : '';
  const region = process.env.REACT_APP_FIREBASE_REGION
    ? `/${process.env.REACT_APP_FIREBASE_REGION}`
    : '';
  return `//${host}${project}${region}/api${path}`;
}

function loadBeers(): Promise<IBeer[]> {
  return fetch(apiUrl('/beers'), { method: 'GET' }).then(handleAPIResponse);
}

function upvoteBeer(beer: IBeer, profile: IProfile): Promise<IBeer> {
  return fetch(apiUrl(`/voting/upvote/${beer.id}`), {
    method: 'POST',
    headers: {
      authorization: `Bearer ${profile.email}`,
    },
  })
    .then(handleAPIResponse)
    .then((data: any) => {
      return { ...beer, votes: data.votes };
    });
}

export default {
  loadBeers,
  upvoteBeer,
};
