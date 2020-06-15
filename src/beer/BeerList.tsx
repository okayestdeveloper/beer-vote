import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import BeerCard from './BeerCard';
import { IBeerListProps } from './beerTypes';

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

const BeerList: React.FC<IBeerListProps> = ({ beers, upvoteBeer }) => {
  const classes = useStyles();
  return (
    <div className={classes.listContainer}>
      {beers.map((beer) => (
        <BeerCard beer={beer} upvote={upvoteBeer} key={beer.id} />
      ))}
    </div>
  );
};

export default BeerList;
