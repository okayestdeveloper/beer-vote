import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BeerList from '../beer/BeerList';
import { IBeer } from '../beer/beerTypes';
import { loadBeers, upvoteBeer } from '../store/actions/beerActions';
import { RootState } from '../store';

export interface IHomePageProps {
  beers: IBeer[];
  loadBeers: () => void;
  upvoteBeer: (beer: IBeer) => void;
}

export const HomePage: React.FC<IHomePageProps> = ({
  beers,
  loadBeers,
  upvoteBeer,
}) => {
  useEffect(() => {
    loadBeers();
  }, [loadBeers]);

  return <BeerList beers={beers} upvoteBeer={upvoteBeer} />;
};

const mapStateToProps = (state: RootState) => ({ beers: state.beers });

const mapDispatchToProps = {
  loadBeers,
  upvoteBeer,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
