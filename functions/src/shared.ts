import { DocumentData, Timestamp } from '@google-cloud/firestore';

export const oneDay = 60 * 60 * 24 * 1000;
export const voteLimit = 5;

export enum COLLECTIONS {
  VOTING = 'voting',
  BEERS = 'beers',
}

/**
 * Just the pieces of the beer interface we need here.
 *
 * @interface IBeer
 */
export interface IBeer {
  id: string;
  votes: number;
}

/**
 * Represents a voting record for a user in Firestore. We use those records to
 * track vote limits per user.
 *
 * @interface IVoting
 */
export interface IVoting extends DocumentData {
  emailHash: string;
  votes: number;
  lastVote: Timestamp | null;
}
