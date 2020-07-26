import { IBeer } from './beerTypes';
import { IProfile } from './../hooks/useProfile';
import { handleAPIResponse } from '../shared/utils';
import { apiUrl } from '../shared/api';

function getBeers(): Promise<IBeer[]> {
  return fetch(apiUrl('/beers'), { method: 'GET' }).then(handleAPIResponse);
}

function postUpvoteBeer(beer: IBeer, profile: IProfile): Promise<IBeer> {
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

export { getBeers, postUpvoteBeer };
