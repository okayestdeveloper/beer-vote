import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBeer } from './beerTypes';
import { getBeers, postUpvoteBeer } from './beerApi';
import { AppThunk } from '../store';
import { IProfile } from '../hooks/useProfile';

interface BeersState {
  beers: IBeer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BeersState = {
  beers: [],
  isLoading: false,
  error: null,
};

function startLoading(state: BeersState) {
  state.isLoading = true;
}

function loadingFailed(state: BeersState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const beerSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    loadBeersStart: startLoading,
    upvoteBeerStart: startLoading,
    loadBeersSuccess(state, { payload }: PayloadAction<IBeer[]>) {
      state.beers = payload;
      state.isLoading = false;
      state.error = null;
    },
    upvoteBeerSuccess(state, { payload }: PayloadAction<IBeer>) {
      state.beers = state.beers.map((beer) => {
        if (beer.id === payload.id) {
          return payload;
        }
        return beer;
      });
      state.isLoading = false;
      state.error = null;
    },
    loadBeersFailure: loadingFailed,
    upvoteBeerFailure: loadingFailed,
  },
});

export const {
  loadBeersStart,
  loadBeersSuccess,
  loadBeersFailure,
  upvoteBeerStart,
  upvoteBeerSuccess,
  upvoteBeerFailure,
} = beerSlice.actions;

export default beerSlice.reducer;

// thunk action to load all beers
export function fetchBeers(): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(loadBeersStart());
      const beers = await getBeers();
      dispatch(loadBeersSuccess(beers));
    } catch (ex) {
      dispatch(loadBeersFailure(ex.toString()));
    }
  };
}

// thunk action to perform an upvote
export function upvoteBeer(beer: IBeer, profile: IProfile): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(upvoteBeerStart());
      const newBeer = await postUpvoteBeer(beer, profile);
      dispatch(upvoteBeerSuccess(newBeer));
    } catch (ex) {
      dispatch(upvoteBeerFailure(ex.toString()));
    }
  };
}
