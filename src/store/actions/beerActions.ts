import { ThunkResult, apiFail } from './../actionTypes';

import {
  BeerActionTypes,
  LOAD_BEERS_SUCCESS,
  UPVOTE_BEER_SUCCESS,
} from './beerActionTypes';
import beerApi from '../../beer/beerApi';
import { IBeer } from '../../beer/beerTypes';

export const upvoteBeer = (beer: IBeer): BeerActionTypes => ({
  type: UPVOTE_BEER_SUCCESS,
  beer,
});

export const loadBeersSuccess = (beers: IBeer[]): BeerActionTypes => ({
  type: LOAD_BEERS_SUCCESS,
  beers,
});

export const loadBeers = (): ThunkResult<Promise<void>, IBeer[]> => (
  dispatch,
) => {
  return beerApi
    .loadBeers()
    .then((beers: IBeer[]) => {
      dispatch(loadBeersSuccess(beers));
    })
    .catch((error) => {
      // todo: set up a snackbar for error messaging
      dispatch(apiFail('Failed to load beers from database.', error));
    });
};
