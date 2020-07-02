import { https, Request, Response } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import {
  Firestore,
  DocumentSnapshot,
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from "@google-cloud/firestore";

initializeApp();

const oneDay = 60 * 60 * 24 * 1000;
const voteLimit = 5;

enum COLLECTIONS {
  VOTING = "voting",
  BEERS = "beers",
}

/**
 * Just the pieces of the beer interface we need here.
 *
 * @interface IBeer
 */
interface IBeer {
  id: string;
  votes: number;
}

/**
 * Represents a voting record for a user in Firestore. We use those records to
 * track vote limits per user.
 *
 * @interface IVoting
 */
interface IVoting extends DocumentData {
  emailHash: string;
  votes: number;
  lastVote: Timestamp | null;
}

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
  voting: IVoting
): Promise<DocumentSnapshot<DocumentData>> {
  voting.lastVote = Timestamp.now();
  const ref = await fstore.collection(COLLECTIONS.VOTING).add(voting);
  return await ref.get();
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
  votingDoc: DocumentSnapshot<DocumentData>
): Promise<DocumentSnapshot<DocumentData>> {
  const voting = votingDoc.data() as IVoting;
  await votingDoc.ref.set(
    { lastVote: Timestamp.now(), votes: voting.votes + 1 },
    { merge: true }
  );
  return votingDoc; // todo: not sure this gets the updated record
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
  emailHash: string
): Promise<DocumentSnapshot<DocumentData>> {
  const snapshot = await fstore
    .collection(COLLECTIONS.VOTING)
    .where("emailHash", "==", emailHash)
    .get();

  if (snapshot.empty) {
    const newVoting: IVoting = {
      emailHash,
      votes: 0,
      lastVote: null,
    };
    return await createVotingRecord(fstore, newVoting);
  }

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
  id: string
): Promise<QuerySnapshot<DocumentData>> {
  const snapshot = await fstore
    .collection(COLLECTIONS.BEERS)
    .where("id", "==", id)
    .get();

  return snapshot;
}

/**
 * Increment the votes field on the beer record for the given DocumentSnapshot
 *
 * @param {DocumentSnapshot<DocumentData>} beerDoc
 * @returns {Promise<IVoting>}
 */
async function incBeerVotes(
  beerDoc: QueryDocumentSnapshot<DocumentData>
): Promise<DocumentSnapshot<DocumentData>> {
  const beer = beerDoc.data() as IVoting;
  await beerDoc.ref.set({ votes: beer.votes + 1 }, { merge: true });
  return beerDoc; // todo: not sure this gets the updated record
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
 * url: https://{region}-beer-vote-{dev?}.web.app/upvote/:id
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
export const upvote = https.onRequest(
  async (request: Request, response: Response) => {
    const fstore = firestore();
    const emailHash = request.header("Authorization")?.substr(7);
    if (!emailHash) {
      response.status(401).send({ message: "You must sign in to vote." });
      return;
    }

    // check voting allowed.
    const votingDoc = await getVotingRecord(fstore, emailHash);

    if (!isVotingAllowed(votingDoc)) {
      response.status(403).send({
        message: `You've reached your vote limit (${voteLimit}) for today.`,
      });
      return;
    }

    // bump user's vote count
    await incVotes(votingDoc);

    // find the beer
    const id = request.param("id");
    const beerDoc = await getBeerRecord(fstore, id);
    if (beerDoc.empty) {
      response.status(404).end();
      return;
    }

    // update the vote count on the beer
    const updatedBeerDoc = await incBeerVotes(beerDoc.docs[0]);

    response.send({
      message: "SUCCESS",
      data: {
        id,
        votes: (updatedBeerDoc.data() as IBeer).votes,
      },
    });
  }
);

export const ping = https.onRequest((req: Request, res: Response) => {
  res.send({ message: "pong", data: { time: Timestamp.now() } });
});
