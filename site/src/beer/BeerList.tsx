import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import BeerCard from './BeerCard';
import { RootState } from '../store/rootReducer';
import { IBeer } from './beerTypes';
import { fetchBeers } from './beerSlice';

function sortByVotes(beerA: IBeer, beerB: IBeer): number {
  return beerB.votes - beerA.votes;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      maxWidth: 1056,
      margin: '0 auto',
    },
  }),
);

function BeerList(): React.ReactElement {
  const dispatch = useDispatch();

  const beers = useSelector((state: RootState) => {
    const sorted = state.beers.beers.slice();
    sorted.sort(sortByVotes);
    return sorted;
  });

  useEffect(() => {
    dispatch(fetchBeers());
  }, []);

  // todo: somehow re-sort after upvote
  const classes = useStyles();
  return (
    <div className={classes.listContainer}>
      {beers.map((beer) => (
        <BeerCard beer={beer} key={beer.id} />
      ))}
    </div>
  );
}

export default BeerList;
