import { firestore } from 'firebase-admin';
import {
  Firestore,
  DocumentSnapshot,
  DocumentData,
  Timestamp,
} from '@google-cloud/firestore';
import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

import { IBeer, IVoting, COLLECTIONS, oneDay, voteLimit } from './shared';

export const votingRoutes = PromiseRouter();

/**
 * Set a new record in the voting collection. New meaning that the emailHash
 * should be unique. `lastVote` gets replaced with Timestamp.now()
 *
 * @param {Firestore} fstore
 * @param {IVoting} voting
 * @returns {Promise<IVoting>}
 */
async function createVotingRecord(
  fstore: Firestore,
  voting: IVoting,
): Promise<DocumentSnapshot<DocumentData>> {
  voting.lastVote = Timestamp.now();
  const ref = await fstore.collection(COLLECTIONS.VOTING).add(voting);
  return ref.get();
}

/**
 * Bump the votes for a user identified by the emailHash in the given voting
 * DocumentSnapshot. The lastVote field gets updated with
 * Timestamp.now()
 *
 * @param {DocumentSnapshot<DocumentData>} votingDoc
 * @returns {Promise<IVoting>}
 */
async function incVotes(
  votingDoc: DocumentSnapshot<DocumentData>,
): Promise<DocumentSnapshot<DocumentData>> {
  const voting = votingDoc.data() as IVoting;
  await votingDoc.ref.set(
    { lastVote: Timestamp.now(), votes: voting.votes + 1 },
    { merge: true },
  );

  return await votingDoc.ref.get();
}

/**
 * Get a voting record for a user.
 *
 * @param {Firestore} firestore
 * @param {string} emailHash the emailHash for the user
 * @returns {Promise<IVoting>} the found record
 * @throws if there's an error with the query.
 */
async function getVotingRecord(
  fstore: Firestore,
  emailHash: string,
): Promise<DocumentSnapshot<DocumentData>> {
  const snapshot = await fstore
    .collection(COLLECTIONS.VOTING)
    .where('emailHash', '==', emailHash)
    .get();

  if (snapshot.empty) {
    console.info('Did not find voting record, creating one.');
    const newVoting: IVoting = {
      emailHash,
      votes: 0,
      lastVote: null,
    };
    return createVotingRecord(fstore, newVoting);
  }
  console.info('Found voting record', snapshot.docs[0]);

  return snapshot.docs[0];
}

/**
 * Get the record for the beer identified by the given id
 *
 * @param {Firestore} fstore
 * @param {string} id
 * @returns {Promise<DocumentSnapshot<DocumentData>>}
 */
async function getBeerRecord(
  fstore: Firestore,
  id: string,
): Promise<DocumentSnapshot> {
  const document = await fstore.collection(COLLECTIONS.BEERS).doc(id).get();
  if (!document.exists) {
    throw new Error(`Did not find beer with id ${id}`);
  }

  return document;
}

/**
 * Increment the votes field on the beer record for the given DocumentSnapshot
 *
 * @param {DocumentSnapshot<DocumentData>} beerDoc
 * @returns {Promise<IVoting>}
 */
async function incBeerVotes(
  beerDoc: DocumentSnapshot<DocumentData>,
): Promise<DocumentSnapshot<DocumentData>> {
  const beer = beerDoc.data() as IVoting;
  await beerDoc.ref.set({ votes: beer.votes + 1 }, { merge: true });

  return await beerDoc.ref.get();
}

/**
 * Determine if voting should be allowed for the user identified by the
 * emailHash in the givent voting record DocumentSnaphot.
 *
 * @param {DocumentSnapshot<DocumentData>} docSnapshot
 * @returns {boolean}
 */
function isVotingAllowed(docSnapshot: DocumentSnapshot<DocumentData>): boolean {
  const now = Timestamp.now().toMillis();
  const voting = docSnapshot.data() as IVoting;
  return !(
    voting.votes === voteLimit &&
    voting.lastVote &&
    now - voting.lastVote.toMillis() < oneDay
  );
}

/**
 * Handle a request for an upvote on a beer
 * url: https://{region}-beer-vote-{dev?}.web.app/api/voting/upvote/:id
 * method: POST
 * params:
 *  id: string; - id of the beer to upvote
 * headers:
 *  Authorization: Bearer <emailHash: string> - email hash for user that's voting
 * response for 200 status:
 *  {
 *    message: 'SUCCESS';
 *    data: {
 *      id: string; // id of the beer
 *      votes: number;  // updated vote count
 *    };
 *  }
 */
votingRoutes.post('/upvote/:beerId', async (req: Request, res: Response) => {
  const fstore = firestore();
  const emailHash = req.headers?.authorization?.substr(7);
  if (!emailHash) {
    res.status(401).send({ message: 'You must sign in to vote.' });
    return;
  }

  // check voting allowed.
  const votingDoc = await getVotingRecord(fstore, emailHash);

  if (!isVotingAllowed(votingDoc)) {
    res.status(403).send({
      message: `You've reached your vote limit (${voteLimit}) for today.`,
    });
    return;
  }

  // bump user's vote count
  await incVotes(votingDoc);

  // find the beer
  const beerId = req.params.beerId;
  let beerDoc;
  try {
    beerDoc = await getBeerRecord(fstore, beerId);
  } catch (ex) {
    res.status(404).send({ message: ex.message });
    return;
  }

  // update the vote count on the beer
  const updatedBeerDoc = await incBeerVotes(beerDoc);

  res.status(200).send({
    message: 'SUCCESS',
    data: {
      id: beerId,
      votes: (updatedBeerDoc.data() as IBeer).votes,
    },
  });
});
