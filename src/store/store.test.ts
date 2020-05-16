import { createStore, Store } from 'redux';

import { initialBeerState } from './reducers/beerReducer';
import { BeerActionTypes } from './actions/beerActionTypes';
import { rootReducer, RootState } from './index';
import { upvoteBeer, loadBeersSuccess } from './actions/beerActions';
import { IBeer } from './../beer/beerTypes';
import { getBeers } from './../beer/mockData';

describe('store', () => {
  let store: Store<RootState, BeerActionTypes>;
  let beers: IBeer[];

  beforeEach(() => {
    store = createStore<RootState, BeerActionTypes, unknown, unknown>(
      rootReducer,
      { beers: initialBeerState },
    );
    beers = getBeers();
  });

  it(`should handle loading beers`, () => {
    const action: BeerActionTypes = loadBeersSuccess(beers);
    store.dispatch(action);

    const loadedBeers = store.getState().beers;
    expect(loadedBeers).toEqual(beers);
  });

  it(`should handle upvoting a beer`, () => {
    const loadaction: BeerActionTypes = loadBeersSuccess(beers);
    store.dispatch(loadaction);

    const beer = JSON.parse(JSON.stringify(beers[0]));
    beer.votes += 1;

    const upvoateAction: BeerActionTypes = upvoteBeer(beer);
    store.dispatch(upvoateAction);

    const upvotedBeer = store.getState().beers[0];
    expect(upvotedBeer).toEqual(beer);
    expect(upvotedBeer.votes).toEqual(beer.votes);
  });
});
