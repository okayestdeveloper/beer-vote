import {
  LOAD_BEERS_SUCCESS,
  UPVOTE_BEER_SUCCESS,
  ILoadBeersSuccessAction,
  IUpvoteBeerAction,
} from './../actions/beerActionTypes';
import { getBeers } from './../../beer/mockData';
import beerReducer from './beerReducer';
import { IBeer } from '../../beer/beerTypes';

describe(`beerReducer`, () => {
  let beers: IBeer[];

  beforeEach(() => {
    beers = getBeers();
  });

  describe(`LOAD_BEERS_SUCCESS`, () => {
    it(`should return beers`, () => {
      const action: ILoadBeersSuccessAction = {
        type: LOAD_BEERS_SUCCESS,
        beers,
      };

      expect(beerReducer([], action)).toEqual(beers);
    });
  });

  describe(`UPVOTE_BEER_SUCCESS`, () => {
    it(`should return list of beers with updated one replaced.`, () => {
      const beer: IBeer = JSON.parse(JSON.stringify(beers[1]));
      beer.votes += 1;

      const action: IUpvoteBeerAction = {
        type: UPVOTE_BEER_SUCCESS,
        beer,
      };

      const newState = beerReducer(beers, action);
      expect(newState[1]).toEqual(beer);
    });
  });
});
