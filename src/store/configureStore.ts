import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IBeer } from './../beer/beerTypes';
import { rootReducer, RootState } from './index';
import { BeerActionTypes } from './actions/beerActionTypes';

const configureStore = (initialState?: RootState) => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk as ThunkMiddleware<{ beers: IBeer[] }, BeerActionTypes>,
        reduxImmutableStateInvariant(),
      ),
    ),
  );
};

export default configureStore;
