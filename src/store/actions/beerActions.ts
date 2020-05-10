import { ThunkDispatch } from 'redux-thunk';

import {
  BeerActionTypes,
  LOAD_BEERS_SUCCESS,
  UPVOTE_BEER_SUCCESS,
} from './beerActionTypes';
import beerApi from '../../beer/beerApi';
import { IBeer } from '../../beer/beerTypes';
import { API_FAIL } from '../actionTypes';

export const upvoteBeer = (beer: IBeer): BeerActionTypes => ({
  type: UPVOTE_BEER_SUCCESS,
  beer,
});

export const loadBeers = () => (
  dispatch: ThunkDispatch<IBeer[], undefined, BeerActionTypes>,
) => {
  beerApi
    .loadBeers()
    .then((beers: IBeer[]) => {
      dispatch({
        type: LOAD_BEERS_SUCCESS,
        beers,
      });
    })
    .catch((error) => {
      // todo: set up a snackbar for error messaging
      dispatch({
        type: API_FAIL,
        message: 'Failed to load beers from database.',
        error,
      });
    });
};
