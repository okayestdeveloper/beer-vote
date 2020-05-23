import React from 'react';

import BeerCard from './BeerCard';
import { IBeerListProps } from './beerTypes';

const BeerList: React.FC<IBeerListProps> = ({ beers, upvoteBeer }) => {
  return (
    <div>
      {beers.map((beer) => (
        <BeerCard beer={beer} upvote={upvoteBeer} key={beer.id} />
      ))}
    </div>
  );
};

export default BeerList;
