import { combineReducers } from 'redux';

import beers from './reducers/beerReducer';

export const rootReducer = combineReducers({
  beers,
});

export type RootState = ReturnType<typeof rootReducer>;
