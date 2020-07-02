import { AnyAction } from 'redux';

import { IAPIFailAction } from '../actionTypes';
import { IBeer } from '../../beer/beerTypes';

export const LOAD_BEERS_SUCCESS = 'LOAD_BEERS_SUCCESS';
export const UPVOTE_BEER_SUCCESS = 'UPVOTE_BEER_SUCCESS';
export const UPVOTE_BEER_FAIL = 'UPVOTE_BEER_FAIL';

export interface ILoadBeersSuccessAction extends AnyAction {
  type: typeof LOAD_BEERS_SUCCESS;
  beers: IBeer[];
}

export interface IUpvoteBeerAction extends AnyAction {
  type: typeof UPVOTE_BEER_SUCCESS;
  beer: IBeer;
}

export type BeerActionTypes =
  | ILoadBeersSuccessAction
  | IUpvoteBeerAction
  | IAPIFailAction;

export type IBeerState = IBeer[];
