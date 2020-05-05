import {
  IBeerReducer,
  UPVOTE_BEER_SUCCESS,
  LOAD_BEERS_SUCCESS,
} from '../actions/beerActionTypes';

const beerReducer: IBeerReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_BEERS_SUCCESS:
      return action.beers;
    case UPVOTE_BEER_SUCCESS:
      return state.map((b) => {
        if (b.id === action.beer.id) {
          return action.beer;
        }
        return b;
      });
    default:
      return state;
  }
};

export default beerReducer;
