import { combineReducers } from 'redux';

import beerReducer from './reducers/beerReducer';

export const rootReducer = combineReducers({
  beers: beerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// TODO: convert this all over to Redux Tool Kit
// https://redux-toolkit.js.org/tutorials/intermediate-tutorial
