import { combineReducers } from 'redux';

import beerReducer from './reducers/beerReducer';

export const rootReducer = combineReducers({
  beers: beerReducer, // note: do I want this to be beer: beerReducer?
});

export type RootState = ReturnType<typeof rootReducer>;
