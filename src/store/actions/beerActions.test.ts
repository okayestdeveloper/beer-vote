import thunk, { ThunkDispatch } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';

import beerApi from '../../beer/beerApi';
import { UPVOTE_BEER_SUCCESS, LOAD_BEERS_SUCCESS } from './beerActionTypes';
import { getBeers } from './../../beer/mockData';
import { upvoteBeer, loadBeers } from './beerActions';
import { IBeer } from '../../beer/beerTypes';

describe('async beer actions', () => {
  const mockStore = createMockStore<
    { beers: IBeer[] },
    ThunkDispatch<IBeer[], undefined, AnyAction>
  >([thunk]);
  let beers: IBeer[];

  beforeEach(() => {
    beers = getBeers();
    beerApi.loadBeers = jest.fn().mockResolvedValue(beers);
  });

  describe(`upvoteBeer`, () => {
    // todo: this will eventually get replaced with a thunk. Leaving it in async section
    it(`should return the correct action`, () => {
      const expectedAction = {
        type: UPVOTE_BEER_SUCCESS,
        beer: beers[0],
      };
      expect(upvoteBeer(beers[0])).toEqual(expectedAction);
    });
  });

  describe(`loadBeers`, () => {
    it(`should return the LOAD_BEERS_SUCCESS action on success`, () => {
      const expectedActions = [
        {
          type: LOAD_BEERS_SUCCESS,
          beers,
        },
      ];
      const store = mockStore({ beers: [] });
      store.dispatch(loadBeers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
