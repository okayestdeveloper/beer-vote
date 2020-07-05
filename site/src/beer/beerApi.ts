import firestore from '../shared/firebase';

import { IBeer } from './beerTypes';

type ILoadBeersApi = () => Promise<IBeer[]>;
const loadBeers: ILoadBeersApi = () => {
  return firestore
    .collection('beers')
    .orderBy('votes')
    .get()
    .then((snapshot) => {
      const beers: IBeer[] = [];
      snapshot.forEach((doc) => {
        const beer = { ...doc.data(), id: doc.id } as IBeer;
        beers.push(beer);
      });
      return beers;
    });
};

type IUpvoteBeerApi = (beer: IBeer) => Promise<IBeer>;
const upvoteBeer: IUpvoteBeerApi = (beer) => {
  // todo: write a cloud function to handle the upvote
  return Promise.resolve(beer);
};

export default {
  loadBeers,
  upvoteBeer,
};