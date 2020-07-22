import { firestore } from 'firebase-admin';
import { Firestore, QuerySnapshot } from '@google-cloud/firestore';
import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

import { IBeer, COLLECTIONS } from './shared';

export const beerRoutes = PromiseRouter();

function getBeers(fstore: Firestore): Promise<IBeer[]> {
  return fstore
    .collection(COLLECTIONS.BEERS)
    .orderBy('votes', 'desc')
    .get()
    .then((snapshot: QuerySnapshot) => {
      const beers: IBeer[] = [];
      snapshot.forEach((doc) => {
        const beer = { ...doc.data(), id: doc.id } as IBeer;
        beers.push(beer);
      });
      return beers;
    });
}

/**
 * Handle a request for an upvote on a beer
 * url: https://{region}-beer-vote-{dev?}.web.app/api/beers/
 * method: GET
 * response for 200 status:
 *  {
 *    message: 'SUCCESS';
 *    data: IBeer[];
 *  }
 */

beerRoutes.get('/', async (req: Request, res: Response) => {
  const fstore = firestore();

  const data = await getBeers(fstore);

  res.status(200).send({
    message: 'SUCCESS',
    data,
  });
});
