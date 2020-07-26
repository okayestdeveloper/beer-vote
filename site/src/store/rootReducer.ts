import { combineReducers } from 'redux';

import beersReducer from '../beer/beerSlice';

const rootReducer = combineReducers({
  /*
  note: and add slices here, like:
  participants: participantReducer
  */
  beers: beersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
